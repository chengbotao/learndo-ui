// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import LearnDoUI from "../../packages/main";
import "./style.css";
import "../../packages/styles/index.scss";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.use(LearnDoUI);
    if (router) {
      // TODO
    }
    if (siteData) {
      // TODO
    }
  },
} satisfies Theme;
