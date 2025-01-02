<script lang="ts" setup>
import { computed } from "vue";
import classNames from "classnames";

type ButtonSize = "large" | "small";
type ButtonType = "primary" | "default" | "danger";

export interface ButtonProps {
  disabled?: boolean;
  className?: string;
  size?: ButtonSize;
  btnType?: ButtonType;
}

export interface ButtonEmits {
  (event: "click", payload: MouseEvent): void;
}

defineOptions({
  name: "LdButton",
});
const props = defineProps<ButtonProps>();
const emits = defineEmits<ButtonEmits>();
const classes = computed(() => {
  return classNames(
    "ld-button",
    {
      disabled: props.disabled,
      [`ld-button-${props.size}`]: props.size,
      [`ld-button-${props.btnType}`]: props.btnType,
    },
    props.className,
  );
});
const handleClick = (event: MouseEvent) => {
  emits("click", event);
};
</script>

<template>
  <button :class="classes" v-bind="$attrs" @click="handleClick">
    <slot></slot>
  </button>
</template>
