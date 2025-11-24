<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import classNames from 'classnames';
  import type { ButtonEmits, ButtonProps } from './button.ts';

  // 组件元信息
  defineOptions({
    name: 'LdButton',
  });

  // 组件内部 Data 定义
  const button = ref<HTMLButtonElement | null>();

  // Props 定义 + 默认值
  const props = withDefaults(defineProps<ButtonProps>(), {
    disabled: false,
    size: 'md', // 默认中等尺寸
    typeFace: 'primary', // 默认主色调
  });

  // 计算属性
  const classes = computed(() => {
    const { size, typeFace, disabled } = props;

    return classNames('ld-button', {
      [`ld-button--${size}`]: size,
      [`ld-button--${typeFace}`]: typeFace,
      disabled: disabled,
    });
  });

  // 事件
  const emits = defineEmits<ButtonEmits>();
  const handleClick = (event: MouseEvent) => {
    if (props.disabled) {
      event.stopPropagation();
      return;
    }
    emits('click', event);
  };
</script>

<template>
  <button
    ref="button"
    :aria-disabled="props.disabled"
    :class="classes"
    :disabled="props.disabled"
    type="button"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
