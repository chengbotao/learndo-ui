<script lang="ts" setup>
const menus = [
  {
    id: 1,
    name: "第一项",
  },
  {
    id: 2,
    name: "第二项",
  },
];
</script>

<template>
  <ld-context-menu :menus="menus">
    <div class="content"></div>
  </ld-context-menu>
</template>

<style lang="scss" scoped>
.content {
  width: 100px;
  height: 100px;
  background: #41d1ff;
}
</style>
