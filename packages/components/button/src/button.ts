type Size = "large" | "small";
type Typeface = "primary" | "danger";

export interface ButtonProps {
  disabled?: boolean;
  size?: Size;
  typeFace?: Typeface;
  loading?: boolean;
}

export interface ButtonEmits {
  (event: "click", payload: MouseEvent): void;
}
