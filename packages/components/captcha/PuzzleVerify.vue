<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import classNames from "classnames";
import LdSliderVerify, { type SliderState } from "./SliderVerify.vue";

export interface PuzzleVerifyProps {
  puzzleImg: string;
  blockImg: string;
  blockY?: number;
}

export interface PuzzleVerifyEmits {
  (e: "moveEnd", state: SliderState, scaleX: number, scaleY: number): void;
}

export interface PuzzleVerifyExpose {
  reset: () => void;
}

defineOptions({
  name: "LdPuzzleVerify",
});

const slide = ref<typeof LdSliderVerify | null>(null);
const puzzle = ref<HTMLDivElement | null>(null);
const puzzleCanvas = ref<HTMLCanvasElement | null>(null);
const blockCanvas = ref<HTMLCanvasElement | null>(null);
const puzzleCtx = ref<CanvasRenderingContext2D | null>(null);
const blockCtx = ref<CanvasRenderingContext2D | null>(null);
const scaleX = ref<number>(1);
const scaleY = ref<number>(1);
const props = withDefaults(defineProps<PuzzleVerifyProps>(), {
  blockY: 0,
});
const classes = computed(() => {
  return classNames("ld-puzzle-verify");
});

const emits = defineEmits<PuzzleVerifyEmits>();

const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

const drawImage = () => {
  if (!puzzleCtx.value || !blockCtx.value) return;
  Promise.all([loadImage(props.puzzleImg), loadImage(props.blockImg)]).then(
    (res) => {
      const [puzzleImg, blockImg] = res;
      // 宽高比
      const aspectRatio = puzzleImg.width / puzzleImg.height;
      puzzleCanvas.value!.width = puzzle.value!.offsetWidth;
      puzzleCanvas.value!.height = puzzle.value!.offsetWidth / aspectRatio;
      // 缩放比
      scaleX.value = puzzleCanvas.value!.width / puzzleImg.width;
      scaleY.value = puzzleCanvas.value!.height / puzzleImg.height;
      console.log(
        blockImg.width,
        blockImg.height,
        puzzleCanvas.value!.height,
        scaleX.value,
        scaleY.value,
        aspectRatio,
      );
      blockCanvas.value!.width = blockImg.width * scaleX.value;
      blockCanvas.value!.height = puzzleCanvas.value!.height;

      puzzleCtx.value!.drawImage(
        puzzleImg,
        0,
        0,
        puzzleImg.width,
        puzzleImg.height,
        0,
        0,
        puzzleCanvas.value!.width,
        puzzleCanvas.value!.height,
      );
      blockCtx.value!.drawImage(
        blockImg,
        0,
        0,
        blockImg.width,
        blockImg.height,
        0,
        props.blockY * scaleY.value,
        blockImg.width * scaleX.value,
        blockImg.height * scaleY.value,
      );
    },
  );
};

const thumbMove = (thumbState: SliderState) => {
  blockCanvas.value!.style.left = thumbState.moveX + "px";
};

const thumbEnd = (thumbState: SliderState) => {
  emits("moveEnd", thumbState, scaleX.value, scaleY.value);
};
const reset = () => {
  blockCanvas.value!.style.left = "0px";
  slide.value!.reset();
};
onMounted(() => {
  puzzleCtx.value = puzzleCanvas.value!.getContext("2d");
  blockCtx.value = blockCanvas.value!.getContext("2d");
  drawImage();
});
watch(() => props.puzzleImg, drawImage);

defineExpose<PuzzleVerifyExpose>({
  reset,
});
</script>

<template>
  <div ref="puzzle" :class="classes">
    <canvas ref="puzzleCanvas" class="puzzle"></canvas>
    <canvas ref="blockCanvas" class="block"></canvas>
    <LdSliderVerify
      ref="slide"
      :draggable="true"
      @thumbEnd="thumbEnd"
      @thumbMove="thumbMove"
    />
  </div>
</template>
