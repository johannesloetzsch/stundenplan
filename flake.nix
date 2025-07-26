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
          hash = "sha256-cOzpUVaz2iLJHoU0bilL+jzRBsuAQDBalpAvQV19gds=";
        };

	inherit nativeBuildInputs;

        buildPhase = ''
          runHook preBuild
            #pnpm storybook_index  ## only works before pnpm build when dist is not excluded
            pnpm build
            pnpm storybook_build  ## only works after pnpm build
          runHook postBuild
        '';
      
        installPhase = ''
          mkdir -p $out/${pname}
          cp -r apps/${pname}/dist/* $out/
          cp -r storybook-static $out/storybook
          #cp index.json $out/storybook/
        '';
      });

      default = stundenplan;
    };
  };
}
