<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import classNames from "classnames";
import useEventListener from "../../../hooks/useEventListener";

import type { SignaturePadExpose, SignaturePadProps } from "./signature-pad.ts";

defineOptions({
  name: "LdSignaturePad",
});

const signaturePad = ref<HTMLCanvasElement | null>(null);
const canvas2D = ref<CanvasRenderingContext2D | null>(null);
const beginX = ref<number>(0);
const beginY = ref<number>(0);
const isWriting = ref(false);

const props = withDefaults(defineProps<SignaturePadProps>(), {
  fillStyle: "#f8f9fa",
  strokeStyle: "#dc3545",
  lineWidth: 3,
});

const classes = computed(() => {
  return classNames("ld-signature-pad", props.className);
});

const drawSignaturePad = () => {
  const canvas = signaturePad.value;
  if (canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas2D.value = canvas.getContext("2d", { willReadFrequently: true });
    if (canvas2D.value) {
      canvas2D.value.fillStyle = props.fillStyle;
      canvas2D.value.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
};

const writing = (
  beginX: number,
  beginY: number,
  stopX: number,
  stopY: number,
  ctx: CanvasRenderingContext2D | null,
) => {
  if (!ctx) return;
  ctx.beginPath();
  ctx.lineWidth = props.lineWidth;
  ctx.strokeStyle = props.strokeStyle;
  props.lineStyle?.(ctx);
  ctx.moveTo(beginX, beginY);
  ctx.lineTo(stopX, stopY);
  ctx.closePath();
  ctx.stroke();
};

const resetSignaturePad = () => {
  if (canvas2D.value && signaturePad.value) {
    canvas2D.value.clearRect(
      0,
      0,
      signaturePad.value.width,
      signaturePad.value.height,
    );
    drawSignaturePad();
  }
};

const getSignatureDataURL = () => {
  return signaturePad.value?.toDataURL("image/png", 1.0);
};

const handleStart = (event: Event) => {
  event.preventDefault();
  if (signaturePad.value === null) return;
  const rect = signaturePad.value.getBoundingClientRect();
  if (event instanceof TouchEvent) {
    beginX.value = event.touches[0].clientX - rect.left;
    beginY.value = event.touches[0].clientY - rect.top;
  } else {
    beginX.value = (event as MouseEvent).clientX - rect.left;
    beginY.value = (event as MouseEvent).clientY - rect.top;
  }
  isWriting.value = true;
};

const handleMove = (event: Event) => {
  event.preventDefault();
  if (isWriting.value) {
    if (signaturePad.value === null) return;
    const rect = signaturePad.value.getBoundingClientRect();
    let stopX: number, stopY: number;
    if (event instanceof TouchEvent) {
      stopX = event.touches[0].clientX - rect.left;
      stopY = event.touches[0].clientY - rect.top;
    } else {
      stopX = (event as MouseEvent).clientX - rect.left;
      stopY = (event as MouseEvent).clientY - rect.top;
    }
    writing(beginX.value, beginY.value, stopX, stopY, canvas2D.value);
    beginX.value = stopX;
    beginY.value = stopY;
  }
};

const handleEnd = () => {
  isWriting.value = false;
};

useEventListener(
  signaturePad,
  ["mousedown", "mousemove"],
  [[handleStart], [handleMove]],
);
useEventListener(
  signaturePad,
  ["touchstart", "touchmove"],
  [[handleStart], [handleMove]],
  {
    passive: true,
  },
);
useEventListener(
  signaturePad,
  ["mouseup", "mouseleave", "touchend"],
  handleEnd,
);

const hasSignature = () => {
  if (!signaturePad.value || !canvas2D.value) return false;

  // 获取画布像素数据
  const canvas = signaturePad.value;
  const ctx = canvas2D.value;
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // 对比像素与背景色差异（跳过完全透明的像素）
  const bgColor = props.fillStyle || "#f8f9fa";
  const [r, g, b] = hexToRgb(bgColor); // 需要实现hex转rgb函数

  for (let i = 0; i < data.length; i += 4) {
    const pixelR = data[i];
    const pixelG = data[i + 1];
    const pixelB = data[i + 2];
    const alpha = data[i + 3];

    // 存在非背景色且不透明的像素 → 视为有签名
    if (alpha > 0 && !(pixelR === r && pixelG === g && pixelB === b)) {
      return true;
    }
  }
  return false;
};

// 辅助函数：十六进制颜色转RGB
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [248, 249, 250]; // 默认背景色RGB
};

onMounted(() => {
  drawSignaturePad();
});

defineExpose<SignaturePadExpose>({
  resetSignaturePad,
  getSignatureDataURL,
  hasSignature,
});
</script>

<template>
  <canvas ref="signaturePad" :class="classes"></canvas>
</template>
