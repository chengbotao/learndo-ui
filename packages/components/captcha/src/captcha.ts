export interface SliderState {
  width?: number;
  moveX?: number;
  moveY?: number;
  trail?: number[];
  duration?: number;
}

export interface PuzzleVerifyProps {
  puzzleImg: string;
  blockImg: string;
  blockY?: number;
}

export interface PuzzleVerifyEmits {
  (e: "moveEnd", state: SliderState, scaleX: number, scaleY: number): void;
}

export interface PuzzleVerifyExpose {
  reset: () => void;
}

export interface SliderVerifyProps {
  draggable?: boolean;
  promptText?: string;
  state?: -1 | 0 | 1;
}

export interface SliderVerifyEmits {
  (event: "thumbMove", params: SliderState): void;

  (event: "thumbEnd", params: SliderState): void;
}

export interface SliderVerifyExpose {
  reset: () => void;
}
