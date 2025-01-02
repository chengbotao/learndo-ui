# SignaturePad

> 签名组件

## 基本用法

<script lang="ts" setup>import {ref} from "vue";
const ldSignaturePad = ref();
const handleGetDataURL = () => {
  console.log(ldSignaturePad.value?.getSignatureDataURL());
};
const resetSignaturePad = () => {
  ldSignaturePad.value?.resetSignaturePad();
};
</script>
<div class="ld-signature-pad--base">
    <LdSignaturePad ref="ldSignaturePad"></LdSignaturePad>
    <ld-button @click="resetSignaturePad">重置</ld-button>
    <ld-button btn-type="primary" @click="handleGetDataURL">确认</ld-button>
</div>

<style lang="scss" module>
.ld-signature-pad--base {
    width: 800px;
    height: 500px;
}
</style>