<script lang="ts" setup>
import { ref } from "vue";

const ldSignaturePad = ref();
const handleGetDataURL = () => {
  console.log(ldSignaturePad.value?.getSignatureDataURL());
};
const resetSignaturePad = () => {
  ldSignaturePad.value?.resetSignaturePad();
};
</script>

<template>
  <LdSignaturePad ref="ldSignaturePad"></LdSignaturePad>
  <ld-button @click="resetSignaturePad">重置</ld-button>
  <ld-button btn-type="primary" @click="handleGetDataURL">确认</ld-button>
</template>
