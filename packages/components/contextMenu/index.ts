import type { ComponentPublicInstance } from 'vue';
import { withInstall } from '../../helper/install';
import ContextMenu from './src/ContextMenu.vue';

export const LdContextMenu = withInstall(ContextMenu);

export type ContextMenuInstance = ComponentPublicInstance &
  InstanceType<typeof ContextMenu> &
  unknown;
