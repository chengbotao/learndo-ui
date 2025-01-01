import type { App, DefineComponent } from "vue";
import type { SignaturePadExpose, SignaturePadProps } from "./SignaturePad.vue";
import SignaturePad from "./SignaturePad.vue";

SignaturePad.install = (app: App) => {
  app.component(SignaturePad.name!, SignaturePad);
};

export default SignaturePad as DefineComponent<
  SignaturePadProps,
  SignaturePadExpose
>;
