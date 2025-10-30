import '../styles/fontsAndReset.css';
import '../styles/styles.css';
import '../styles/mapstyles.css';

import { addLayers } from './mapUtilities/layers';
import { addPolyline } from './mapUtilities/polylines';
// import { addMarkers } from './mapUtilities/points';
import { initGPS } from './gpsRealTime';

document.addEventListener('DOMContentLoaded', () => {
  // config map
  const config = {
    minZoom: 12,
    maxZoom: 18,
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
    [34.878806783147816, 135.63638914020237],
    [35.08720985235213, 135.85607464186808]
  ]);

  // This adds all of the lines we are gonna use for the routes and cycle lanes
  addLayers(MAP);
  addPolyline(MAP);
  // addMarkers(MAP);
  initGPS(MAP);//resets location per one second
});