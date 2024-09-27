import { composePlugins, withNx, withReact } from '@nx/rspack';
import { Configuration } from '@rspack/core';

const rspackConfig = composePlugins(
  withNx(),
  withReact(),
  (config: Configuration) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      path: 'path-browserify',
      // https://stackoverflow.com/a/76129651
      'react/jsx-runtime': 'react/jsx-runtime.js',
    };

    return config;
  }
);

export default rspackConfig;
