import { LdButton } from './components/button';
import { LdPuzzleVerify, LdSliderVerify } from './components/captcha';
import { LdContextMenu } from './components/contextMenu';
import { LdSignaturePad } from './components/signaturePad';
import type { App, Plugin } from 'vue';

export * from './hooks';

const components: Plugin[] = [
  LdButton,
  LdSliderVerify,
  LdPuzzleVerify,
  LdContextMenu,
  LdSignaturePad,
];

const install = (app: App) => {
  components.forEach((c) => {
    app.use(c);
  });
};

export { LdButton, LdSliderVerify, LdPuzzleVerify, LdContextMenu, LdSignaturePad, install };

export default install;
