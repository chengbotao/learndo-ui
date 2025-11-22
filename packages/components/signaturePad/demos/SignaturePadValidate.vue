<script lang="ts" setup>
  import { ref } from 'vue';

  const signatureRef = ref();
  const isSigned = ref(false);
  const isError = ref(false);

  // 提交签名
  const handleSubmit = () => {
    if (signatureRef.value?.hasSignature()) {
      isSigned.value = true;
      isError.value = false;
      const dataUrl = signatureRef.value?.getSignatureDataURL();
      console.log(dataUrl);
    } else {
      isSigned.value = false;
      isError.value = true;
    }
  };

  // 重置
  const handleReset = () => {
    signatureRef.value?.resetSignaturePad();
    isSigned.value = false;
    isError.value = false;
  };
</script>

<template>
  <LdSignaturePad
    ref="signatureRef"
    :line-width="5"
    class="validate-signature"
    stroke-style="#e74c3c"
  />
  <div v-if="isError" class="error">
    <i class="fa fa-exclamation-circle error-icon"></i>请先完成签名
  </div>
  <ld-button @click="handleReset">重新签名</ld-button>
  <ld-button type-face="primary" @click="handleSubmit">确认提交</ld-button>

  <div v-if="isSigned" class="status"> <i class="fa-solid fa-check-circle"></i> 签名已完成 </div>
</template>

<style lang="scss" scoped>
  .validate-signature {
    height: 180px;
    background: #fafafa;
    border: 1px solid #ddd;
  }

  .error {
    margin: 12px 0;
    font-size: 14px;
    color: #dc3545;

    i {
      margin-right: 4px;
    }
  }

  .status {
    margin-top: 12px;
    font-size: 14px;
    color: #2ecc71;

    i {
      margin-right: 4px;
    }
  }
</style>
