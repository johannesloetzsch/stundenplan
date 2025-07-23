{
  description = "Example pnpm-nix-build";

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
      nix-pnpm-demo = pkgs.stdenv.mkDerivation (finalAttrs: {
        pname = "nix-pnpm-demo";
        version = "0.1.0";
        src = ./.;
      
        pnpmDeps = pnpm.fetchDeps {
          inherit (finalAttrs) pname version src;
          hash = "sha256-QFInyi6v+FuDZnta9cC5f+CDuKDQQCiplMD0Vvzvk+c=";
        };

	inherit nativeBuildInputs;

        buildPhase = ''
          runHook preBuild
            #pnpm build
            pnpm --filter=timeline build
          runHook postBuild
        '';
      
        installPhase = ''
          mkdir -p $out/timeline
          cp -r apps/timeline/dist/* $out/timeline/
        '';
      });

      default = nix-pnpm-demo;
    };
  };
}
