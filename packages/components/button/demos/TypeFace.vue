<template>
  <div class="ld-row">
    <ld-button>Default</ld-button>
    <ld-button type-face="primary">Primary</ld-button>
    <ld-button type-face="success">Success</ld-button>
    <ld-button type-face="danger">Danger</ld-button>
    <ld-button type-face="warning">Warning</ld-button>
    <ld-button type-face="info">Info</ld-button>
    <ld-button type-face="secondary">secondary</ld-button>
    <ld-button type-face="light">light</ld-button>
    <ld-button type-face="dark">dark</ld-button>
  </div>

  <div class="ld-row">
    <ld-button class="round">Default</ld-button>
    <ld-button class="round" type-face="primary">Primary</ld-button>
    <ld-button class="round" type-face="success">Success</ld-button>
    <ld-button class="round" type-face="danger">Danger</ld-button>
    <ld-button class="round" type-face="warning">Warning</ld-button>
    <ld-button class="round" type-face="info">Info</ld-button>
    <ld-button class="round" type-face="secondary">secondary</ld-button>
    <ld-button class="round" type-face="light">light</ld-button>
    <ld-button class="round" type-face="dark">dark</ld-button>
  </div>

  <div class="ld-row">
    <ld-button class="circle"><i class="fa-solid fa-thumbs-up"></i></ld-button>
    <ld-button class="circle" type-face="primary"><i class="fa-solid fa-face-smile"></i></ld-button>
    <ld-button class="circle" type-face="success"><i class="fa-solid fa-heart"></i></ld-button>
    <ld-button class="circle" type-face="danger"><i class="fa-solid fa-ghost"></i></ld-button>
    <ld-button class="circle" type-face="warning"><i class="fa-solid fa-tree"></i></ld-button>
    <ld-button class="circle" type-face="info"
      ><i class="fa-solid fa-earth-americas"></i
    ></ld-button>
    <ld-button class="circle" type-face="secondary"><i class="fa-solid fa-ghost"></i></ld-button>
    <ld-button class="circle" type-face="light"><i class="fa-solid fa-tree"></i></ld-button>
    <ld-button class="circle" type-face="dark"
      ><i class="fa-solid fa-earth-americas"></i
    ></ld-button>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
  .round {
    border-radius: 20px;
  }

  .circle {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
</style>
