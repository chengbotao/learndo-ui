import SignaturePad from "./components/signaturePad";
import Button from "./components/button";
import Captcha from "./components/captcha";
import type { App, DefineComponent } from "vue";

export { default as useEventListener } from "./hooks/useEventListener";

const components: DefineComponent[] = [
  SignaturePad,
  Button,
  ...(Captcha as DefineComponent[]),
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export { SignaturePad, Button, Captcha, install };

export default install;
