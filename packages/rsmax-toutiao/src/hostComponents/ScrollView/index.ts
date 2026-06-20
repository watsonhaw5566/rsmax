import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface ScrollViewProps extends BaseProps {
  scrollX?: boolean;
  scrollY?: boolean;
  upperThreshold?: number;
  lowerThreshold?: number;
  scrollTop?: number;
  scrollLeft?: number;
  scrollIntoView?: string;
  scrollWithAnimation?: boolean;
  enableBackToTop?: boolean;
  enableFlex?: boolean;
  refresherEnabled?: boolean;
  refresherDefaultStyle?: 'black' | 'white' | 'none';
  refresherBackground?: string;
  refresherThreshold?: number;
  refresherTriggered?: boolean;
  enhanced?: boolean;
  bounces?: boolean;
  showScrollbar?: boolean;
  pagingEnabled?: boolean;
  fastDeceleration?: boolean;
  onScrollToUpper?: (e: any) => void;
  onScrollToLower?: (e: any) => void;
  onScroll?: (e: any) => void;
  onRefresherPulling?: (e: any) => void;
  onRefresherRefresh?: (e: any) => void;
  onRefresherRestore?: (e: any) => void;
  onRefresherAbort?: (e: any) => void;
  onDragStart?: (e: any) => void;
  onDragging?: (e: any) => void;
  onDragEnd?: (e: any) => void;
}

export const ScrollView: React.ComponentType<ScrollViewProps> = createHostComponent<ScrollViewProps>('scroll-view');

ScrollView.defaultProps = {
  scrollX: false,
  scrollY: false,
  upperThreshold: 50,
  lowerThreshold: 50,
  scrollWithAnimation: false,
};
