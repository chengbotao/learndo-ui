<template>
  <LdContextMenu :menus="nestedMenus">
    <div class="nested-area">嵌套菜单演示区域</div>
  </LdContextMenu>
</template>

<script setup>
  const nestedMenus = [
    {
      id: 'file',
      name: '文件操作',
      children: [
        { id: 'new', name: '新建' },
        { id: 'save', name: '保存' },
        { id: 'separator' },
        {
          id: 'export',
          name: '导出',
          children: [
            { id: 'export-pdf', name: 'PDF格式' },
            { id: 'export-doc', name: 'Word格式' },
          ],
        },
      ],
    },
    {
      id: 'edit',
      name: '编辑',
      children: [
        { id: 'undo', name: '撤销' },
        { id: 'redo', name: '重做' },
      ],
    },
  ];
</script>

<style scoped>
  .nested-area {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 200px;
    background: #f5f7fa;
  }
</style>
