<script lang="ts" setup>
import { computed, ref, useSlots } from "vue";
import { useContextMenu } from "./useContextMenu.ts";
import { useViewport } from "./useViewport.ts";

defineOptions({
  name: "LdContextMenu",
});

export interface ContextMenuProps {
  menus: Record<string, never>[];
}

export interface ContextMenuEmits {
  (e: "select", item: Record<string, unknown>): void;
}

const contextMenu = ref<HTMLElement | null>(null);
const w = ref(0);
const h = ref(0);
const { x, y, showMenu } = useContextMenu(contextMenu);
const { vw, vh } = useViewport();
const contextMenuStyle = computed(() => {
  let finalX = x.value;
  let finalY = y.value;
  if (x.value + w.value > vw.value) {
    finalX -= w.value;
  }
  if (y.value + h.value > vh.value) {
    finalY -= y.value - vh.value + h.value;
  }
  return {
    left: `${finalX}px`,
    top: `${finalY}px`,
  };
});
const props = withDefaults(defineProps<ContextMenuProps>(), {
  menus: () => [],
});
const slots = useSlots();
const emit = defineEmits<ContextMenuEmits>();

const handleClick = (event: Event, item: Record<string, unknown>) => {
  event.preventDefault();
  showMenu.value = false;
  emit("select", item);
};
const handleBeforeEnter = (el: Element) => {
  (el as HTMLElement).style.height = "0";
};
const handleEnter = (el: Element) => {
  (el as HTMLElement).style.height = "auto";
  const width = (el as HTMLElement).clientWidth;
  const height = (el as HTMLElement).clientHeight;
  w.value = width;
  h.value = height;
  (el as HTMLElement).style.height = "0";
  requestAnimationFrame(() => {
    (el as HTMLElement).style.height = `${height}px`;
    (el as HTMLElement).style.transition = "0.5s";
  });
};
const handleAfterEnter = (el: Element) => {
  (el as HTMLElement).style.transition = "none";
};
</script>

<template>
  <div ref="contextMenu">
    <slot></slot>
    <teleport to="body">
      <transition
        name="ld-fade"
        @enter="handleEnter"
        @before-enter="handleBeforeEnter"
        @after-enter="handleAfterEnter"
      >
        <ul v-if="showMenu" :style="contextMenuStyle" class="ld-context-menu">
          <li
            v-for="item in props.menus"
            :key="item.id"
            @click="handleClick($event, item)"
          >
            <template v-if="!slots.contextMenuItem">
              {{ item.name }}
            </template>
            <slot :scope="item" name="contextMenuItem"></slot>
          </li>
        </ul>
      </transition>
    </teleport>
  </div>
</template>
