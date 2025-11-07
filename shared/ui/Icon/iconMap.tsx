import React from 'react';
import type { IconName } from './Icon.types';

interface IconData {
  viewBox: string;
  children: React.ReactNode;
}

export const iconMap: Record<IconName, IconData> = {
  error: {
    viewBox: '0 0 20 20',
    children: (
      <>
        <circle cx="10" cy="10" r="10" fill="#ef4444" />
        <path d="M10 6V10M10 14H10.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  success: {
    viewBox: '0 0 20 20',
    children: (
      <>
        <circle cx="10" cy="10" r="10" fill="#22c55e" />
        <path
          d="M6 10L9 13L14 7"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  'shield-check': {
    viewBox: '0 0 24 24',
    children: (
      <>
        <path
          d="M12 2L4 5V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V5L12 2Z"
          fill="#22c55e"
        />
        <path
          d="M9 12L11 14L15 10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
};
