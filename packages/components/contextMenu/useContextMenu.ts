import { ref } from "vue";
import useEventListener, {
  type EventListenerTarget,
} from "../../hooks/useEventListener";

export function useContextMenu(contextMenu: EventListenerTarget) {
  const showMenu = ref(false);
  const x = ref(0);
  const y = ref(0);
  const handleContextMenu = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    showMenu.value = true;
    x.value = (event as MouseEvent).clientX;
    y.value = (event as MouseEvent).clientY;
  };

  const closeMenu = () => {
    showMenu.value = false;
  };
  useEventListener(document, "click", closeMenu, true);
  useEventListener(document, "contextmenu", closeMenu, true);
  useEventListener(contextMenu, "contextmenu", handleContextMenu);
  return { x, y, showMenu };
}
