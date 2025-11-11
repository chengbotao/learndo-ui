<script lang="ts" setup>
import { ref } from "vue";
import type { SliderState } from "../src/captcha.ts";

const sliderVerify = ref();
const state = ref(-1);
const state1 = ref(-1);
const state2 = ref(-1);

const handleThumbMove = () => {
  console.log("滑动中");
};
const handleThumbEnd = (sliderState: SliderState) => {
  console.log("滑动结束");
  if (sliderState.moveX === sliderState.width! - 40) {
    state.value = 1;
  } else {
    state.value = 0;
    setTimeout(() => {
      sliderVerify.value.reset();
      state.value = -1;
    }, 1000);
  }
};
const handleThumbEnd1 = (sliderState: SliderState) => {
  console.log("滑动结束");
  if (sliderState.moveX === sliderState.width! - 40) {
    state1.value = 1;
  } else {
    state1.value = 0;
  }
};
const handleThumbEnd2 = (sliderState: SliderState) => {
  console.log("滑动结束");
  if (sliderState.moveX === sliderState.width! - 40) {
    state2.value = 1;
  } else {
    state2.value = 0;
  }
};
</script>

<template>
  <ld-slider-verify
    ref="sliderVerify"
    :state="state"
    @thumbEnd="handleThumbEnd"
    @thumbMove="handleThumbMove"
  >
  </ld-slider-verify>

  <ld-slider-verify
    ref="sliderVerify"
    :state="state1"
    promptText="校验成功状态"
    @thumbEnd="handleThumbEnd1"
    @thumbMove="handleThumbMove"
  >
  </ld-slider-verify>

  <ld-slider-verify
    ref="sliderVerify"
    :state="state2"
    promptText="校验失败状态"
    @thumbEnd="handleThumbEnd2"
    @thumbMove="handleThumbMove"
  >
  </ld-slider-verify>
</template>
