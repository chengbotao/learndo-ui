import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/learndo-ui/" : "/",
  title: "LearnDo UI",
  description: "Vue3 components library",
  head: [
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Vue3 UI Library" }],
    [
      "meta",
      {
        property: "og:description",
        content: "通过开发组件库学习 Vue3、 Typescript 和工程化",
      },
    ],
    [
      "meta",
      {
        property: "og:url",
        content: "https://chengbotao.github.io/learndo-ui",
      },
    ],
  ],
  rewrites: {
    "packages/components/:pkg/(.*)": ":pkg/index.md",
    "packages/hooks/:pkg/(.*)": ":pkg/index.md",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    sidebar: [
      {
        text: "Components",
        items: [
          {
            text: "SignaturePad",
            link: "/signaturePad",
          },
          {
            text: "Button",
            link: "/button",
          },
          {
            text: "Captcha",
            link: "/captcha",
          },
          {
            text: "ContextMenu",
            link: "/contextMenu",
          },
        ],
      },
      {
        text: "Hooks",
        items: [
          {
            text: "useEventListener",
            link: "/useEventListener",
          },
          {
            text: "useCountdown",
            link: "/useCountdown",
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/chengbotao" }],
  },
  vite: {
    /**
     * TODO
     * 因为sass依赖在项目和vitepress中有兼容问题,
     * 故不继承项目的vite配置
     * */
    configFile: false,
  },
});
