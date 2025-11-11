declare module "vue" {
  export interface GlobalComponents {
    LdButton: (typeof import("../packages/main"))["LdButton"];
    LdSliderVerify: (typeof import("../packages/main"))["LdSliderVerify"];
    LdPuzzleVerify: (typeof import("../packages/main"))["LdPuzzleVerify"];
    LdContextMenu: (typeof import("../packages/main"))["LdContextMenu"];
    LdSignaturePad: (typeof import("../packages/main"))["LdSignaturePad"];
  }

  interface ComponentCustomProperties {}
}

export {};
