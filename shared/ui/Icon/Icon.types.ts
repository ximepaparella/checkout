export type IconName = 'error' | 'success' | 'shield-check';

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}
