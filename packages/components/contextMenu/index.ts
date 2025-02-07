import type { App, DefineComponent } from "vue";
import type { ContextMenuEmits, ContextMenuProps } from "./ContextMenu.vue";
import ContextMenu from "./ContextMenu.vue";

ContextMenu.install = (app: App) => {
  app.component(ContextMenu.name!, ContextMenu);
};

export default ContextMenu as DefineComponent<
  ContextMenuProps,
  ContextMenuEmits
>;
