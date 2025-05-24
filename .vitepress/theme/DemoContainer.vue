<script lang="ts" setup>
import { computed, defineAsyncComponent, inject } from "vue";

defineOptions({
  name: "DemoContainer",
});

const props = defineProps<{
  source: string;
  path: string;
  rawSource: string;
  description: string;
  extension: string;
}>();

const decodedDescription = computed(() =>
  decodeURIComponent(props.description),
);
const decodedSource = computed(() => decodeURIComponent(props.source));

const demoModules = inject("demoModules");
const sourceModule = defineAsyncComponent(demoModules[props.path]);
</script>

<template>
  <div v-html="decodedDescription" />

  <section class="example">
    <div class="example-showcase">
      <component :is="sourceModule"></component>
    </div>
    <div v-html="decodedSource"></div>
  </section>
</template>

<style lang="scss" scoped></style>
