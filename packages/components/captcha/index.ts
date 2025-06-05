import type { ComponentPublicInstance } from "vue";
import { withInstall } from "../../helper/install";
import SliderVerify from "./src/SliderVerify.vue";
import PuzzleVerify from "./src/PuzzleVerify.vue";

export const LdSliderVerify = withInstall(SliderVerify);
export const LdPuzzleVerify = withInstall(PuzzleVerify);

export type SliderVerifyInstance = ComponentPublicInstance &
  InstanceType<typeof SliderVerify> &
  unknown;

export type PuzzleVerifyInstance = ComponentPublicInstance &
  InstanceType<typeof PuzzleVerify> &
  unknown;
