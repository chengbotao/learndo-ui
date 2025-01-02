import SignaturePad from "./components/signaturePad";
import Button from "./components/button";
import type { App, DefineComponent } from "vue";

const components: DefineComponent[] = [SignaturePad, Button];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export { SignaturePad, install };

export default install;
