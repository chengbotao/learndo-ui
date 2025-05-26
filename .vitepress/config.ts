import { defineConfig } from "vitepress";
import { mdContainerDemo } from "./plugins/demo";
import path from "path";

const SITE_BASE = process.env.NODE_ENV === "production" ? "/learndo-ui/" : "/";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: SITE_BASE,
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
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: `${SITE_BASE}favicon/favicon-96x96.png`,
        sizes: "96x96",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: `${SITE_BASE}favicon/favicon.svg`,
      },
    ],
    ["link", { rel: "shortcut icon", href: `${SITE_BASE}favicon/favicon.ico` }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: `${SITE_BASE}favicon/apple-touch-icon.png`,
        sizes: "180x180",
      },
    ],
    ["link", { rel: "manifest", href: `${SITE_BASE}favicon/site.webmanifest` }],

    [
      "link",
      {
        rel: "stylesheet",
        href: `${SITE_BASE}fontawesome/css/fontawesome.css`,
      },
    ],
    [
      "link",
      { rel: "stylesheet", href: `${SITE_BASE}fontawesome/css/brands.css` },
    ],
    [
      "link",
      { rel: "stylesheet", href: `${SITE_BASE}fontawesome/css/solid.css` },
    ],
    [
      "link",
      { rel: "stylesheet", href: `${SITE_BASE}fontawesome/css/sharp-thin.css` },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: `${SITE_BASE}fontawesome/css/duotone-thin.css`,
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: `${SITE_BASE}fontawesome/css/sharp-duotone-thin.css`,
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
    logo: "/logo.png",

    sidebar: [
      {
        text: "Components",
        items: [
          {
            text: "Button 按钮",
            link: "/button",
          },
          {
            text: "SignaturePad 签字板",
            link: "/signaturePad",
          },
          {
            text: "Captcha 行为验证码",
            link: "/captcha",
          },
          {
            text: "ContextMenu 右键菜单",
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

    socialLinks: [
      { icon: "github", link: "https://github.com/chengbotao" },
      {
        icon: {
          svg: '<svg t="1741408990097" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="1514" width="200" height="200"><path d="M64 960V128h832v832z" fill="#CB3837" p-id="1515"></path><path d="M192 320h576v512h-128V448H448v384H192z" fill="#FFFFFF" p-id="1516"></path></svg>',
        },
        link: "https://www.npmjs.com/package/learndo-ui",
      },
    ],
  },
  vite: {
    /**
     * TODO
     * 因为sass依赖在项目和vitepress中有兼容问题,
     * 故不继承项目的vite配置
     * */
    configFile: false,
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },
  markdown: {
    config: (md) => {
      md.use(mdContainerDemo, {
        docRoot: path.resolve(__dirname, "../packages/components"),
      });
    },
  },
});
