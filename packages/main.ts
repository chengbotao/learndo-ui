import SignaturePad from "./components/signaturePad";
import type { App, DefineComponent } from "vue";

const components: DefineComponent[] = [SignaturePad];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export { SignaturePad, install };

export default install;
