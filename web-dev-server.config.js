/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { legacyPlugin } from '@web/dev-server-legacy';
import { esbuildPlugin } from '@web/dev-server-esbuild';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: { exportConditions: mode === 'dev' ? ['development'] : [] },
  preserveSymlinks: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      jsx: true,
      jsxImportSource: 'lit-html',
      target: 'es2020'
    }),
    legacyPlugin({
      polyfills: {
        webcomponents: false,
      },
    }),
  ],
  appIndex: 'index.html',
  open: true,
  historyApiFallback: true,
  mimeTypes: {
    '**/*.ts': 'js'
  },
  middleware: [
    (context, next) => {
      if (context.url.endsWith('.ts')) {
        context.response.set('Content-Type', 'application/javascript');
      }
      return next();
    }
  ]
};
