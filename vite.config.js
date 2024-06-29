import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Ensure the output directory is set to 'dist'
    rollupOptions: {
      input: './src/index.tsx'
    }
  }
});
