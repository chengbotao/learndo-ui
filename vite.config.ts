import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/main.ts'),
      name: 'LearnDoUI',
    },
    copyPublicDir: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
  plugins: [
    vue(),
    dts({
      outDir: 'types',
      tsconfigPath: './tsconfig.app.json',
      exclude: ['**/__tests__'],
    }),
  ],
});
