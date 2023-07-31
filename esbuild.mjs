import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['node18.17'],
  format: 'cjs',
  outdir: 'dist',
});
