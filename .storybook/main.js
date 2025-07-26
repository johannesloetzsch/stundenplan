

import { join, dirname } from "path"
import resolve from 'resolve';

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
//function getAbsolutePath(value) {
//  return dirname(require.resolve(join(value, 'package.json')))
//}

/** replaced function to work with `nix build` **/
function getAbsolutePath(value) {
  const packageJsonPath = resolve.sync(join(value, 'package.json'), { basedir: process.cwd() });
  return dirname(packageJsonPath);
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../apps/*/src/**/*.mdx",
    "../packages/*/src/**/*.mdx",
    "../apps/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  "addons": [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/react-vite'),
    "options": {}
  }
};
export default config;
