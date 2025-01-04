# Captcha

> 验证码组件

## 滑块组件

<script lang="ts" setup>import {ref} from "vue";
const sliderVerify = ref();
const state = ref(-1);
const state1 = ref(-1);
const state2 = ref(-1);
const handleThumbMove = () => {
    console.log("滑动中");
};
const handleThumbEnd = (sliderState) => {
    console.log("滑动结束");
    if (sliderState.moveX === sliderState.width - 40) {
        state.value = 1;
    }else{
        state.value = 0;
        setTimeout(() => {
            sliderVerify.value.reset();
            state.value = -1;
        }, 1000);
        
    }
};
const handleThumbEnd1 = (sliderState) => {
    console.log("滑动结束");
    if (sliderState.moveX === sliderState.width - 40) {
        state1.value = 1;
    }else{
        state1.value = 0;
    }
};
const handleThumbEnd2 = (sliderState) => {
    console.log("滑动结束");
    if (sliderState.moveX === sliderState.width - 40) {
        state2.value = 1;
    }else{
        state2.value = 0;
    }
};
</script>

<ld-slider-verify ref="sliderVerify" :state="state" @thumbMove="handleThumbMove" @thumbEnd="handleThumbEnd">
</ld-slider-verify>

<ld-slider-verify ref="sliderVerify" promptText="校验成功状态" :state="state1" @thumbMove="handleThumbMove" @thumbEnd="
handleThumbEnd1">
</ld-slider-verify>

<ld-slider-verify ref="sliderVerify" promptText="校验失败状态" :state="state2" @thumbMove="handleThumbMove" @thumbEnd="
handleThumbEnd2">
</ld-slider-verify>