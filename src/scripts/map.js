import '../styles/fontsAndReset.css';
import '../styles/styles.css';
import '../styles/mapstyles.css';

import { northLimit, southLimit, eastLimit, westLimit } from './mapUtilities/mapData';

import { addLayers } from './mapUtilities/layers';
import { addPolyline } from './mapUtilities/polylines';
import { addMarkers } from './mapUtilities/points';
import { initGPS } from './gpsRealTime';

document.addEventListener('DOMContentLoaded', () => {
  // config map
  const config = {
    minZoom: 12,
    maxZoom: 19,
    zoomControl: false,
  };
  // magnification with which the map will start
  const zoom = 15;

  // calling map
  const MAP = L.map('map', config).setView(
    [34.98493616431302, 135.75248977767515],
    zoom,
  );

  // Sets map bounds
  MAP.setMaxBounds([
    [northLimit, eastLimit],
    [southLimit, westLimit],
  ]);

  // This adds all of the lines we are gonna use for the routes and cycle lanes
  addLayers(MAP);
  initGPS(MAP);
  addPolyline(MAP);
  addMarkers(MAP);
});
