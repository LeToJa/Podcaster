/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...configDefaults.exclude,
        '**/node_modules/**',
        '**/dist/**',
        '**/.{idea,git,cache,output,temp}/**',
        './src/App.tsx',
        './src/main.tsx',
        './src/pages/index.tsx',
        './src/constants/index.tsx',
        './src/types/index.tsx',
        './src/vite-env.d.ts',
        '**/types.tsx',
        './postcss.config.js',
        './tailwind.config.js',
      ]
    },
  },
})
