import type { ComponentPublicInstance } from 'vue';
import { withInstall } from '../../helper/install';
import Button from './src/Button.vue';

export const LdButton = withInstall(Button);

export type ButtonInstance = ComponentPublicInstance & InstanceType<typeof Button> & unknown;
