import * as esbuild from 'esbuild';

import { options } from './options.js';

const ctx = await esbuild.context({ ...options });

await ctx.watch();
console.log('watching...');
