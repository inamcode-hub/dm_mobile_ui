import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          dependencies: [
            '@emotion/react',
            '@emotion/styled',
            '@fontsource/roboto',
            '@mui/icons-material',
            '@mui/material',
            '@reduxjs/toolkit',
            'axios',
            'react',
            'react-dom',
            'react-redux',
            'react-router-dom',
          ],
        },
      },
    },
  },
});
