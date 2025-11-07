import React from 'react';
import type { IconProps } from './Icon.types';
import { iconMap } from './iconMap';

const IconComponent: React.FC<IconProps> = ({
  name,
  size = 20,
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
}) => {
  const icon = iconMap[name];

  if (!icon) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Icon "${name}" not found in iconMap`);
    }
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ? 'true' : undefined}
      role={ariaLabel ? 'img' : undefined}
    >
      {icon.children}
    </svg>
  );
};

export const Icon = React.memo(IconComponent);

Icon.displayName = 'Icon';
