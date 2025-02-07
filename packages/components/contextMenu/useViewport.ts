import { ref } from "vue";
import useEventListener from "../../hooks/useEventListener";

const vw = ref(document.documentElement.clientWidth);
const vh = ref(document.documentElement.clientHeight);

export function useViewport() {
  const handleResize = () => {
    vw.value = document.documentElement.clientWidth;
    vh.value = document.documentElement.clientHeight;
  };

  useEventListener(window, "click", handleResize, true);
  return { vw, vh };
}
