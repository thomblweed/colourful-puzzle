import * as esbuild from 'esbuild';

import { options } from './options.js';

await esbuild.build({ ...options });
