import type { App, DefineComponent } from "vue";
import type { ButtonEmits, ButtonProps } from "./src/button.ts";
import Button from "./src/Button.vue";

Button.install = (app: App) => {
  app.component(Button.name!, Button);
};

export default Button as DefineComponent<ButtonProps, ButtonEmits>;
