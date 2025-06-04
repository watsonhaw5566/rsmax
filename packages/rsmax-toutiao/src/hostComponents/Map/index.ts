import React from 'react';
import { createHostComponent } from '@rsmax/runtime';
import { BaseProps } from '../../types/component';

type Label = {
  content?: string;
  color?: string;
  fontSize?: number;
  borderRadius?: number;
  padding?: number;
  textAlign?: 'left' | 'center' | 'right';
  borderWidth?: number;
  borderColor?: string;
  bgColor?: string;
  anchorX?: number;
  anchorY?: number;
};

type Circle = {
  latitude: number;
  longitude: number;
  color?: string;
  fillColor?: string;
  radius?: number;
  strokeWidth?: number;
};

type Callout = {
  content?: string;
  color?: string;
  fontSize?: number;
  borderRadius?: number;
  padding?: number;
  display?: 'BYCLICK' | 'ALWAYS';
  textAlign?: 'left' | 'center' | 'right';
  bgColor?: string;
  borderWidth?: number;
  anchorX?: number;
  anchorY?: number;
};

type LngLat = {
  latitude: number;
  longitude: number;
};

type ArrowOption = {
  show?: boolean;
  color?: string;
  width?: number;
  spaceWidth?: number;
};

type Polyline = {
  points: LngLat[];
  color?: string;
  width?: number;
  dottedLine?: boolean;
  colorList?: string[];
  borderColor?: string;
  borderWidth?: string;
  arrowOption: ArrowOption;
};

type Markers = {
  id?: number;
  latitude: number;
  longitude: number;
  title?: string;
  iconPath?: string;
  width?: number;
  height?: number;
  zIndex?: number;
  callout?: Callout;
  alpha?: number;
  anchorX?: number;
  anchorY?: number;
  rotate?: number;
  label?: Label;
};

type Polygon = {
  points: LngLat[];
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  zIndex?: number;
};

export interface MapProps extends BaseProps {
  longitude: number;
  latitude: number;
  scale?: number;
  markers?: Markers[];
  circles?: Circle[];
  showLocation?: boolean;
  polyline?: Polyline[];
  includePoints?: LngLat[];
  onTap?: (event: any) => void;
  onClick?: (event: any) => void;
  onMarkerTap?: (event: any) => void;
  onCalloutTap?: (event: any) => void;
  onRegionChange?: (event: any) => void;
  rotate?: number;
  skew?: number;
  polygons?: Polygon[];
  showCompass?: number;
  enableOverlooking?: boolean;
  enableRotate?: boolean;
  minScale?: number;
  maxScale?: number;
  enable3D?: boolean;
  showScale?: boolean;
  enableZoom?: boolean;
  enableScroll?: boolean;
  enableSatellite?: boolean;
  enableTraffic?: boolean;
  enablePoi?: boolean;
  enableBuilding?: boolean;
  onLabelTap?: (event: any) => void;
  onUpdated?: (event: any) => void;
  onAnchorPointTap?: (event: any) => void;
}

export const Map: React.ComponentType<MapProps> = createHostComponent<MapProps>('map');
