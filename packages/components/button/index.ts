import type { App, DefineComponent } from "vue";
import type { ButtonEmits, ButtonProps } from "./Button.vue";
import Button from "./Button.vue";

Button.install = (app: App) => {
  app.component(Button.name!, Button);
};

export default Button as DefineComponent<ButtonProps, ButtonEmits>;
