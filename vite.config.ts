import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: '.',
  base: './',
  plugins: [tsconfigPaths()],

  build: {
    outDir: 'deploy',
    emptyOutDir: true,
    sourcemap: true,
  },
});