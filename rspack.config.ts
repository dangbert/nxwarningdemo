import { composePlugins, withNx, withReact } from '@nx/rspack';
import { Configuration } from '@rspack/core';

const rspackConfig = composePlugins(
  withNx(),
  withReact(),
  (config: Configuration) => {
    console.log(`NODE_ENV: '${process.env.NODE_ENV}'`);

    config.module = config.module || {};
    config.module.parser = {
      'css/auto': {
        namedExports: false,
      },
    };
    config.experiments = {
      css: true,
    };

    // https://rspack.org/config/dev-server
    config.devServer = {
      ...config.devServer,
      // port set in project.json:targets:serve as has no effect here for some reason
      //   https://nx.dev/nx-api/rspack/executors/dev-server#nxrspackdevserver
      // port: process.env.DEV_HOST_PORT || 3000,
      host: '0.0.0.0', // make accessible outside of docker
      proxy: [
        {
          context: '/api',
          target: 'http://flask:5000',
          changeOrigin: true,
        },
      ],
      historyApiFallback: {
        // full settings: https://github.com/bripkens/connect-history-api-fallback
        index: '/index.html',
        verbose: true,
        disableDotRule: true, // avoid "Not rewriting GET /p/example.md because the path includes a dot (.) character."
      },

      /*headers: {
        'Content-Security-Policy':
          "default-src 'unsafe-inline' 'unsafe-eval' * data: blob:;",
      },*/

      client: {
        logging: 'verbose',
      },
    };

    // single page application routing https://rsbuild.dev/config/server/history-api-fallback
    // use 'path-browserify' as drop in replacement for import 'path'
    //   https://rspack.org/config/resolve.html#resolvealias
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      path: 'path-browserify',
      // https://stackoverflow.com/a/76129651
      'react/jsx-runtime': 'react/jsx-runtime.js',
    };

    config.stats = {
      all: true, // This enables logging of all types of information
      errors: true, // Show errors
      warnings: true, // Show warnings
      errorDetails: true, // Show full error details
      logging: 'verbose', // Log at verbose level
    };

    // console.log('final config:\n', config);
    return config;
  },
);

export default rspackConfig;
