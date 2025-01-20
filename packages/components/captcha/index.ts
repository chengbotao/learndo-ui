import type { App, DefineComponent } from "vue";
import type {
  SliderVerifyEmits,
  SliderVerifyExpose,
  SliderVerifyProps,
} from "./SliderVerify.vue";
import SliderVerify from "./SliderVerify.vue";
import PuzzleVerify, { type PuzzleVerifyProps } from "./PuzzleVerify.vue";

SliderVerify.install = (app: App) => {
  app.component(SliderVerify.name!, SliderVerify);
};
PuzzleVerify.install = (app: App) => {
  app.component(PuzzleVerify.name!, PuzzleVerify);
};

export default [SliderVerify, PuzzleVerify] as [
  DefineComponent<SliderVerifyProps, SliderVerifyEmits, SliderVerifyExpose>,
  DefineComponent<PuzzleVerifyProps>,
];
