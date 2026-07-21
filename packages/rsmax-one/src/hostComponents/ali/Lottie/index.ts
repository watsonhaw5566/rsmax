import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface LottieProps {
  id?: string;
  className?: string;
  autoplay?: boolean;
  path?: string;
  djangoId?: string;
  md5?: string;
  speed?: number;
  repeatCount?: number;
  autoReverse?: number;
  assetsPath?: string;
  placeholder?: string;
  optimize?: boolean;
  onDataReady?: (e: any) => void;
  onDataFailed?: (e: any) => void;
  onDataLoadReady?: (e: any) => void;
  onAnimationStart?: (e: any) => void;
  onAnimationEnd?: (e: any) => void;
  onAnimationRepeat?: (e: any) => void;
  onAnimationCancel?: (e: any) => void;
}

export const Lottie = createHostComponent<LottieProps>('lottie') as React.ComponentType<LottieProps>;
