import type { ComponentPublicInstance } from 'vue';
import { withInstall } from '../../helper/install';
import SignaturePad from './src/SignaturePad.vue';

export const LdSignaturePad = withInstall(SignaturePad);

export type SignaturePadInstance = ComponentPublicInstance &
  InstanceType<typeof SignaturePad> &
  unknown;
