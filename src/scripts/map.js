import '../styles/fontsAndReset.css';
import '../styles/styles.css';
import '../styles/mapstyles.css';

import { northLimit, southLimit, eastLimit, westLimit } from './mapUtilities/mapData';

import { addLayers } from './mapUtilities/layers';
import { addPolyline } from './mapUtilities/polylines';
import { addMarkers } from './mapUtilities/points';
import { initGPS } from './gpsRealTime';

document.addEventListener('DOMContentLoaded', () => {
  const config = {
    minZoom: 12,
    maxZoom: 19,
    zoomControl: false,
  };

  // calling map
  const initialZoom = 15;
  const MAP = L.map('map', config).setView(
    [34.98493616431302, 135.75248977767515],
    initialZoom,
  );
  MAP.setMaxBounds([
    [northLimit, eastLimit],
    [southLimit, westLimit],
  ]);

  // This adds all of the lines we are gonna use for the routes and cycle lanes
  addLayers(MAP);
  addPolyline(MAP);
  addMarkers(MAP);
  initGPS(MAP);
});
