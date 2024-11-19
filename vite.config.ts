import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/page/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@image': path.resolve(__dirname, 'src/common/asset/image'),
      '@main': path.resolve(__dirname, 'src/page/main'),
    },
  },
});
