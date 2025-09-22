<script lang="ts" setup>
import { ref } from "vue";

const signatureRef = ref();
const outputDataUrl = ref("");

// 获取签名数据并展示
const handleSave = () => {
  const dataUrl = signatureRef.value?.getSignatureDataURL();
  if (dataUrl) outputDataUrl.value = dataUrl;
};

// 重置签名板
const handleReset = () => {
  signatureRef.value?.resetSignaturePad();
  outputDataUrl.value = "";
};
</script>

<template>
  <LdSignaturePad
    ref="signatureRef"
    :lineWidth="4"
    class="custom-signature"
    fillStyle="#f0f8ff"
    strokeStyle="#2c3e50"
  />

  <ld-button @click="handleReset">重置</ld-button>
  <ld-button type-face="primary" @click="handleSave">保存&预览</ld-button>
  <div v-if="outputDataUrl" class="preview">
    <h4>预览：</h4>
    <img :src="outputDataUrl" alt="签名结果" class="preview-img" />
  </div>
</template>

<style lang="scss" scoped>
.custom-signature {
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 8px;
}

.preview {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
  .preview-img {
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
}
</style>
