<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import classNames from "classnames";
import useEventListener from "../../hooks/useEventListener";

export interface SliderState {
  width?: number;
  moveX?: number;
  moveY?: number;
  trail?: number[];
  duration?: number;
}

export interface SliderVerifyProps {
  draggable?: boolean;
  promptText?: string;
  state?: -1 | 0 | 1;
}

export interface SliderVerifyEmits {
  (event: "thumbMove", params: SliderState): void;

  (event: "thumbEnd", params: SliderState): void;
}

export interface SliderVerifyExpose {
  reset: () => void;
}

defineOptions({
  name: "LdSliderVerify",
});

const slider = ref<HTMLDivElement | null>(null);
const sliderWidth = ref<number>(0);
const thumb = ref<HTMLDivElement | null>(null);
const trackActive = ref<boolean>(false);
const thumbMoveX = ref<number>(0);
const isDrag = ref<boolean>(false);
const thumbBeginX = ref<number>(0);
const thumbBeginY = ref<number>(0);
const thumbTrail = ref<number[]>([]);
const timestamp = ref<number>(0);

const props = withDefaults(defineProps<SliderVerifyProps>(), {
  draggable: true,
  promptText: "请向右滑动",
  state: -1,
});
const trackClasses = computed(() => {
  return classNames("ld-slider-verify", {
    active: trackActive.value,
    success: !trackActive.value && props.state === 1,
    fail: !trackActive.value && props.state === 0,
  });
});
const thumbStyle = computed(() => {
  return {
    left: thumbMoveX.value + "px",
  };
});
const maskStyle = computed(() => {
  return {
    width: thumbMoveX.value + "px",
  };
});

const emits = defineEmits<SliderVerifyEmits>();

// 鼠标按下
const handleStart = (event: Event) => {
  event.preventDefault();
  if (!props.draggable) return;
  if (event instanceof TouchEvent) {
    thumbBeginX.value = event.touches[0].clientX;
    thumbBeginY.value = event.touches[0].clientY;
  } else {
    thumbBeginX.value = (event as MouseEvent).clientX;
    thumbBeginY.value = (event as MouseEvent).clientY;
  }
  isDrag.value = true;
  timestamp.value = +Date.now();
};
// 鼠标移动
const handleMove = (event: Event) => {
  if (!isDrag.value) return;
  let moveY;
  if (event instanceof TouchEvent) {
    thumbMoveX.value = event.touches[0].clientX - thumbBeginX.value;
    moveY = event.touches[0].clientY - thumbBeginY.value;
  } else {
    thumbMoveX.value = (event as MouseEvent).clientX - thumbBeginX.value;
    moveY = (event as MouseEvent).clientY - thumbBeginY.value;
  }
  // 限制滑动范围
  const rect = slider.value!.getBoundingClientRect();
  if (thumbMoveX.value > rect.width - 40) {
    thumbMoveX.value = rect.width - 40;
  }
  if (thumbMoveX.value < 0) {
    thumbMoveX.value = 0;
  }
  trackActive.value = true;
  thumbTrail.value.push(moveY);
  emits("thumbMove", {
    width: sliderWidth.value,
    moveX: thumbMoveX.value,
    moveY: moveY,
    trail: thumbTrail.value,
  });
};
// 鼠标抬起
const handleEnd = (event: Event) => {
  if (!isDrag.value) return;
  isDrag.value = false;
  let moveY;
  if (event instanceof TouchEvent) {
    thumbMoveX.value = event.changedTouches[0].clientX - thumbBeginX.value;
    moveY = event.changedTouches[0].clientY - thumbBeginY.value;
  } else {
    thumbMoveX.value = (event as MouseEvent).clientX - thumbBeginX.value;
    moveY = (event as MouseEvent).clientY - thumbBeginY.value;
  }
  // 限制滑动范围
  const rect = slider.value!.getBoundingClientRect();
  if (thumbMoveX.value > rect.width - 40) {
    thumbMoveX.value = rect.width - 40;
  }
  if (thumbMoveX.value < 0) {
    thumbMoveX.value = 0;
  }
  trackActive.value = false;
  const duration = +Date.now() - timestamp.value;
  if (!verifyHuman(thumbTrail.value)) {
    reset();
    return;
  }
  emits("thumbEnd", {
    width: sliderWidth.value,
    moveX: thumbMoveX.value,
    moveY,
    duration,
    trail: thumbTrail.value,
  });
};

// 重置
const reset = () => {
  isDrag.value = false;
  trackActive.value = false;
  thumbMoveX.value = 0;
  thumbTrail.value = [];
};

// 人机操作判断
const verifyHuman = (tail: number[]) => {
  // 平均值
  const average = tail.reduce((x, y) => x + y, 0) / tail.length;
  // 标准差集合
  const deviations = tail.map((x) => x - average);
  // 标准差
  const stddev = Math.sqrt(
    deviations.map((x) => x * x).reduce((x, y) => x + y, 0) / tail.length,
  );

  return average !== stddev;
};

useEventListener(thumb, "mousedown", handleStart);
useEventListener(document, "mousemove", handleMove);
useEventListener(thumb, ["mouseup", "mouseleave"], handleEnd);

useEventListener(thumb, "touchstart", handleStart, {
  passive: true,
});
useEventListener(document, "touchmove", handleMove, {
  passive: true,
});
useEventListener(thumb, "touchend", handleEnd);

onMounted(() => {
  sliderWidth.value = slider.value!.offsetWidth;
});

defineExpose<SliderVerifyExpose>({
  reset,
});
</script>

<template>
  <div ref="slider" :class="trackClasses">
    <div :style="maskStyle" class="track"></div>
    <div ref="thumb" :style="thumbStyle" class="thumb"></div>
    <span class="text"> {{ props.promptText }} </span>
  </div>
</template>
