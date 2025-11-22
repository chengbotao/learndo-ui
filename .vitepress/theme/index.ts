// https://vitepress.dev/guide/custom-theme
import { defineAsyncComponent, h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import '../../packages/styles/index.scss';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  async enhanceApp({ app, router, siteData }) {
    if (!import.meta.env.SSR) {
      // 注册 learndo-ui
      const LearnDoUI = await import('../../packages/main');
      app.use(LearnDoUI.default);
      // 注册 DemoContainer
      app.component(
        'DemoContainer',
        defineAsyncComponent(() => import('./DemoContainer.vue')),
      );
      // 获取所有 demos 组件
      const modules = import.meta.glob('/packages/components/**/demos/*.vue');
      const demoModules: Record<string, () => Promise<unknown>> = {};
      for (const path in modules) {
        const demoPath = path.replace(/\/packages\/components\/(.*)(\/demos\/)(.*)\.vue/, '$1$2$3');
        demoModules[demoPath] = modules[path];
      }
      app.provide('demoModules', demoModules);
    }
    if (router) {
      // TODO
    }
    if (siteData) {
      // TODO
    }
  },
} satisfies Theme;
