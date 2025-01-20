# Captcha

> 验证码组件

## 滑块组件

<script lang="ts" setup>import {onMounted, ref} from "vue";
const sliderVerify = ref();
const state = ref(-1);
const state1 = ref(-1);
const state2 = ref(-1);
const puzzle = ref();
const block = ref();
const puzzleCtx = ref();
const blockCtx = ref();
const block_x = ref(0);
const block_y = ref(0);
const blockWidth = ref(0);
const blockY = ref(0);
onMounted(() => {
    puzzleCtx.value = puzzle.value.getContext("2d");
    blockCtx.value = block.value.getContext("2d");
});

const puzzleImg = ref();
const blockImg = ref();
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
const getRandomNumberByRange=(start, end)=> {
  return Math.round(Math.random() * (end - start) + start);
};
const draw = (ctx, x, y, operation)=> {
  let l = 42;
  let r = 10;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * Math.PI, 2.26 * Math.PI);
  ctx.lineTo(x + l, y);
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * Math.PI, 2.78 * Math.PI);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * Math.PI, 1.24 * Math.PI, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.stroke();
  ctx[operation]();
  ctx.globalCompositeOperation = "destination-over";
};
const drawBlock = ()=> {
  block_x.value = getRandomNumberByRange(
      65 + 10,
      300 - (65 + 10)
  );
  block_y.value = getRandomNumberByRange(
      10 + 10 * 2,
      150 - (65 + 10)
  );
  draw(puzzleCtx.value, block_x.value, block_y.value, "fill");
  draw(blockCtx.value, block_x.value, block_y.value, "clip");
};
const Img = new Image();
Img.src = "/img.png";
Img.onload = () => {
    drawBlock();
    puzzleCtx.value.drawImage(Img, 0, 0, 300, 150);
    blockCtx.value.drawImage(Img, 0, 0, 300, 150);

    blockY.value = block_y.value - 10 * 2 - 1;
    let ImageData = blockCtx.value.getImageData(block_x.value, blockY.value, 65, 65);
    blockWidth.value = 65;
    block.value.width = blockWidth.value;
    block.value.height = 65;
    blockCtx.value.putImageData(ImageData, 0, 0);
    puzzleImg.value = puzzle.value.toDataURL("image/png", 1.0);
    blockImg.value = block.value.toDataURL("image/png", 1.0);
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

## 滑块拼图组件

<canvas ref="puzzle" v-show="false"></canvas>
<canvas ref="block" v-show="false"></canvas>
<ld-puzzle-verify class="ld-puzzle-verify--base" :puzzleImg="puzzleImg" :blockImg="blockImg" :blockY="blockY">
</ld-puzzle-verify>

<style>
.ld-puzzle-verify--base {
    width: 300px;
    height: 150px;
}
</style>