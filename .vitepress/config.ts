import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LearnDo UI",
  description: "",
  rewrites: {
    "packages/components/:pkg/(.*)": ":pkg/index.md",
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
            text: "SliderVerify",
            link: "/captcha",
          },
        ],
      },
    ],

    socialLinks: [],
  },
  vite: {
    configFile: false,
  },
});
