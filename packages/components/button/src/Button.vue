<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import classNames from 'classnames';
  import type { ButtonEmits, ButtonProps } from './button.ts';

  // defineOptions
  defineOptions({
    name: 'LdButton',
  });
  // data
  const button = ref<HTMLButtonElement | null>();
  // props
  const props = defineProps<ButtonProps>();
  // emits
  const emits = defineEmits<ButtonEmits>();
  // computed
  const classes = computed(() => {
    return classNames('ld-button', {
      disabled: props.disabled,
      [`ld-button-${props.size}`]: props.size,
      [`ld-button-${props.typeFace}`]: props.typeFace,
    });
  });
  // methods
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
