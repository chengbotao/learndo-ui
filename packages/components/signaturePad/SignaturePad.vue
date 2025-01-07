<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import classNames from "classnames";
import useEventListener from "../../hooks/useEventListener";

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
onMounted(() => {
  drawSignaturePad();
});

defineExpose<SignaturePadExpose>({
  resetSignaturePad,
  getSignatureDataURL,
});
</script>

<template>
  <canvas ref="signaturePad" :class="classes"></canvas>
</template>
