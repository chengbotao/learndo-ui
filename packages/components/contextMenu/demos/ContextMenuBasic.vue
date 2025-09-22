<template>
  <LdContextMenu :menus="baseMenus" @menu-click="handleMenuClick">
    <div class="demo-area">基础右键菜单区域</div>
  </LdContextMenu>
  <div v-if="lastAction" class="log">最后操作: {{ lastAction }}</div>
</template>

<script setup>
import { ref } from "vue";

const lastAction = ref("");
const baseMenus = [
  { id: "copy", name: "复制", icon: "fa-copy" },
  { id: "paste", name: "粘贴", icon: "fa-paste", disabled: true },
  { id: "cut", name: "剪切", icon: "fa-cut" },
  { id: "separator" }, // 分割线
  { id: "delete", name: "删除", icon: "fa-trash" },
];

const handleMenuClick = (id) => {
  lastAction.value = baseMenus.find((item) => item.id === id)?.name;
};
</script>

<style scoped>
.demo-area {
  width: 300px;
  height: 200px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.log {
  margin-top: 10px;
  color: #666;
}
</style>
