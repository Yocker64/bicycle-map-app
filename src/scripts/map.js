import '../styles/styles.css';
import '../styles/map.css';
import '../styles/mapstyles.css';
import '../styles/map_elements/MarkerCluster.css';
import '../styles/map_elements/MarkerCluster.Default.css';

import { northLimit, southLimit, eastLimit, westLimit } from './mapUtilities/mapData';

import { addLayers } from './mapUtilities/layers';
import { addPolyline } from './mapUtilities/polylines';
import { addMarkers } from './mapUtilities/points';
import { initGPS } from './gpsRealTime';

document.addEventListener('DOMContentLoaded', () => {
  const config = {
    minZoom: 2,
    maxZoom: 19,
    zoomControl: false,
    zoomSnap: 0.5,
  };

  // calling map
  const initialZoom = 15;
  const map = L.map('map', config).setView(
    [34.98493616431302, 135.75248977767515],
    initialZoom,
  );
  // map.setMaxBounds([
  //   [northLimit, eastLimit],
  //   [southLimit, westLimit],
  // ]);

  // This adds all of the lines we are gonna use for the routes and cycle lanes
  addLayers(map);
  addPolyline(map);
  addMarkers(map);
  initGPS(map);

  // This removes the context menu for all the images
  document.querySelectorAll('img').forEach(img => {
    img.style.userSelect = 'none';
    img.style.webkitTouchCallout = 'none';
    img.addEventListener('contextmenu', evt => {
      evt.preventDefault();
      return false;
    });
  });
});
