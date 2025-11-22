type Size = 'large' | 'small';
type Typeface = 'primary' | 'danger' | 'success' | 'warning' | 'info';

export interface ButtonProps {
  disabled?: boolean;
  size?: Size;
  typeFace?: Typeface;
  // loading?: boolean;
}

export type ButtonEmits = (event: 'click', payload: MouseEvent) => void;
