export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonTypeFace =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'secondary'
  | 'light'
  | 'dark';

export interface ButtonProps {
  disabled?: boolean;
  size?: ButtonSize;
  typeFace?: ButtonTypeFace;
}

export type ButtonEmits = (event: 'click', payload: MouseEvent) => void;
