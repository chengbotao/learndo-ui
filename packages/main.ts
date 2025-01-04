import SignaturePad from "./components/signaturePad";
import Button from "./components/button";
import SliderVerify from "./components/captcha";

import type { App, DefineComponent } from "vue";

const components: DefineComponent[] = [SignaturePad, Button, SliderVerify];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export { SignaturePad, install };

export default install;
