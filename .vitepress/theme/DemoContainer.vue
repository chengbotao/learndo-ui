<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";

defineOptions({
  name: "DemoContainer",
});

const props = defineProps<{
  source: string;
  path: string;
  rawSource: string;
  description: string;
}>();

const decodedDescription = computed(() =>
  decodeURIComponent(props.description),
);
const decodedSource = computed(() => decodeURIComponent(props.source));
const modules = import.meta.glob("/packages/components/**/demos/*.vue");
const sourceModule = defineAsyncComponent(
  modules[`/packages/components/${props.path}.vue`],
);
// const sourceModule = defineAsyncComponent(
//   () => import(withBase(`/packages/components/${props.path}.vue`)),
// );
</script>

<template>
  <div text="sm" v-html="decodedDescription" />

  <section class="example">
    <div class="example-showcase">
      <slot name="source" />
      <component :is="sourceModule"></component>
    </div>
    <div v-html="decodedSource"></div>
  </section>
</template>

<style lang="scss" scoped></style>
