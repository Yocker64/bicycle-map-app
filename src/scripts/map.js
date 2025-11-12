import '../styles/styles.css';
import '../styles/map.css';
import '../styles/mapstyles.css';
import 'leaflet.markercluster';

import { northLimit, southLimit, eastLimit, westLimit } from './mapUtilities/mapData';

import { addLayers } from './mapUtilities/layers';
import { addPolyline } from './mapUtilities/polylines';
import { addMarkers } from './mapUtilities/points';
import { initGPS } from './gpsRealTime';

document.addEventListener('DOMContentLoaded', () => {
  const config = {
    // minZoom: 11,
    maxZoom: 19,
    zoomControl: false,
    zoomSnap: 0.5,
  };

  // calling map
  const initialZoom = 15;
  const MAP = L.map('map', config).setView(
    [34.98493616431302, 135.75248977767515],
    initialZoom,
  );
  // MAP.setMaxBounds([
  //   [northLimit, eastLimit],
  //   [southLimit, westLimit],
  // ]);

  // This adds all of the lines we are gonna use for the routes and cycle lanes
  addLayers(MAP);
  addPolyline(MAP);
  addMarkers(MAP);
  initGPS(MAP);

  const cluster = window.L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
      return L.divIcon({
        html: '<div></div>',
      });
    }
  });

  // Loop through all images on the page adding necessary styles and 
  // event listener to prevent images from opening the context menu.
  document.querySelectorAll('img').forEach(img => {
    img.style.webkitUserSelect = 'none';
    img.style.webkitTouchCallout = 'none';
    img.addEventListener('contextmenu', evt => {
      evt.preventDefault();
      return false;
    });
  });
});
