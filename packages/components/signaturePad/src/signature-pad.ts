export interface SignaturePadProps {
  className?: string;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  lineStyle?: (ctx: CanvasRenderingContext2D) => void;
}

export interface SignaturePadExpose {
  resetSignaturePad: () => void;
  getSignatureDataURL: () => string | undefined;
  hasSignature: () => boolean;
}
