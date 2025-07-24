{
  description = "Unterrichtsplanung per Formswizard";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};

    nodejs = pkgs.nodejs_latest;
    pnpm = pkgs.nodePackages_latest.pnpm;
      
    nativeBuildInputs = [
      nodejs
      pnpm.configHook
    ];
  in {
    packages.${system} = rec {
      stundenplan = pkgs.stdenv.mkDerivation (finalAttrs: rec {
        pname = "stundenplan";
        version = "0.1.0";
        src = ./.;
      
        pnpmDeps = pnpm.fetchDeps {
          inherit (finalAttrs) pname version src;
          hash = "sha256-E+S8gwW1Zc4H1sX6NdMdYH/JuNohinyo8t4UA+36Dh8=";
        };

	inherit nativeBuildInputs;

        buildPhase = ''
          runHook preBuild
            pnpm build
            #pnpm --filter=${pname} build
          runHook postBuild
        '';
      
        installPhase = ''
          mkdir -p $out/${pname}
          #cp -r apps/${pname}/dist/* $out/${pname}/
          cp -r apps/${pname}/dist/* $out/
        '';
      });

      default = stundenplan;
    };
  };
}
