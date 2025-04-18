// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import "../../packages/styles/index.scss";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  async enhanceApp({ app, router, siteData }) {
    /** TODO
     * 项目viteconfig 跟 vitepress的viteconfig兼容问题如何处理?
     * 在.vitepress添加tsconfigjson import.meta不报红单上面样式文件引入会报红,
     * 又不想单独声明声明declare module
     * */
    // @ts-ignore
    if (!import.meta.env.SSR) {
      const LearnDoUI = await import("../../packages/main");
      app.use(LearnDoUI.default);
    }
    if (router) {
      // TODO
    }
    if (siteData) {
      // TODO
    }
  },
} satisfies Theme;
