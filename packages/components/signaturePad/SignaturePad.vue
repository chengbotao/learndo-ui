<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import classNames from "classnames";

export interface SignaturePadProps {
  className?: string;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  lineStyle?: (ctx: CanvasRenderingContext2D) => void;
}

export interface SignaturePadExpose {
  resetSignaturePad: () => void;
  getSignatureDataURL: () => string | undefined;
}

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
    canvas2D.value = canvas.getContext("2d");
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

const handleStart = (event: MouseEvent | TouchEvent) => {
  event.preventDefault();
  isWriting.value = true;
  if (signaturePad.value === null) return;
  const rect = signaturePad.value.getBoundingClientRect();
  if (event instanceof TouchEvent) {
    beginX.value = event.touches[0].clientX - rect.left;
    beginY.value = event.touches[0].clientY - rect.top;
  } else {
    beginX.value = event.clientX - rect.left;
    beginY.value = event.clientY - rect.top;
  }
};

const handleMove = (event: MouseEvent | TouchEvent) => {
  event.preventDefault();
  if (isWriting.value) {
    if (signaturePad.value === null) return;
    const rect = signaturePad.value.getBoundingClientRect();
    let stopX: number, stopY: number;
    if (event instanceof TouchEvent) {
      stopX = event.touches[0].clientX - rect.left;
      stopY = event.touches[0].clientY - rect.top;
    } else {
      stopX = event.clientX - rect.left;
      stopY = event.clientY - rect.top;
    }
    writing(beginX.value, beginY.value, stopX, stopY, canvas2D.value);
    beginX.value = stopX;
    beginY.value = stopY;
  }
};

const handleEnd = () => {
  isWriting.value = false;
};

onMounted(() => {
  drawSignaturePad();
  signaturePad.value?.addEventListener("mousedown", handleStart);
  signaturePad.value?.addEventListener("mousemove", handleMove);
  signaturePad.value?.addEventListener("mouseup", handleEnd);
  signaturePad.value?.addEventListener("mouseleave", handleEnd);
  signaturePad.value?.addEventListener("touchstart", handleStart, {
    passive: true,
  });
  signaturePad.value?.addEventListener("touchmove", handleMove, {
    passive: true,
  });
  signaturePad.value?.addEventListener("touchend", handleEnd);
});

onBeforeMount(() => {
  signaturePad.value?.removeEventListener("mousedown", handleStart);
  signaturePad.value?.removeEventListener("mousemove", handleMove);
  signaturePad.value?.removeEventListener("mouseup", handleEnd);
  signaturePad.value?.removeEventListener("mouseleave", handleEnd);
  signaturePad.value?.removeEventListener("touchstart", handleStart);
  signaturePad.value?.removeEventListener("touchmove", handleMove);
  signaturePad.value?.removeEventListener("touchend", handleEnd);
});
defineExpose<SignaturePadExpose>({
  resetSignaturePad,
  getSignatureDataURL,
});
</script>

<template>
  <canvas ref="signaturePad" :class="classes"></canvas>
</template>
