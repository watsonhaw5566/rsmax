import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  style: 'style',
  className: 'class',
  latitude: 'latitude',
  longitude: 'longitude',
  scale: 'scale',
  markers: 'markers',
  polyline: 'polyline',
  circles: 'circles',
  controls: 'controls',
  polygon: 'polygon',
  showLocation: 'show-location',
  includePoints: 'include-points',
  includePadding: 'include-padding',
  groundOverlays: 'ground-overlays',
  tileOverlay: 'tile-overlay',
  setting: 'setting',
  onMarkerTap: 'onMarkerTap',
  onMarkerClick: 'onMarkerTap',
  onCalloutTap: 'onCalloutTap',
  onCalloutClick: 'onCalloutTap',
  onControlTap: 'onControlTap',
  onControlClick: 'onControlTap',
  onRegionChange: 'onRegionChange',
  onTap: 'onTap',
  onClick: 'onTap',
};

export const props = unique(Object.values(alias));
