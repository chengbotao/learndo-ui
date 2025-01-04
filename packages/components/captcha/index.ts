import type { App, DefineComponent } from "vue";
import type {
  SliderVerifyEmits,
  SliderVerifyExpose,
  SliderVerifyProps,
} from "./SliderVerify.vue";
import SliderVerify from "./SliderVerify.vue";

SliderVerify.install = (app: App) => {
  app.component(SliderVerify.name!, SliderVerify);
};

export default SliderVerify as DefineComponent<
  SliderVerifyProps,
  SliderVerifyEmits,
  SliderVerifyExpose
>;
