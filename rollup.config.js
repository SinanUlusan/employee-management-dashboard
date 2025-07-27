import summary from 'rollup-plugin-summary';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: 'main.js',
    sourcemap: true
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({ preventAssignment: false, 'Reflect.decorate': 'undefined' }),
    typescript(),
    resolve(),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' },
        { src: 'src/assets', dest: 'dist' },
        { src: 'src/components', dest: 'dist' },
        { src: 'src/contants', dest: 'dist' },
        { src: 'src/locales', dest: 'dist' },
        { src: 'src/router', dest: 'dist' },
        { src: 'src/stores', dest: 'dist' },
        { src: 'src/styles', dest: 'dist' },
        { src: 'src/utils', dest: 'dist' },
        { src: 'src/app', dest: 'dist' }
      ]
    })
  ],
};