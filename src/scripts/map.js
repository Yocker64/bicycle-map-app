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

  // const customIcon = L.icon({
  //   iconUrl: "   https://cdn-icons-png.flaticon.com/512/135/135620.png ",
  //   iconSize: [38, 38],
  // });

  // var marker1 = L.marker([51, 0], {icon: customIcon});
  // var marker2 = L.marker([51.01, 0.01], {icon: customIcon});
  // var marker3 = L.marker([51, 0.02], {icon: customIcon});

  // const cluster = window.L.markerClusterGroup({
  //   iconCreateFunction: function (cluster) {
  //     return L.divIcon({
  //       html: '<div style="background-color: white;">aa</div>',
  //     });
  //   }
  // });

  // cluster.addLayer(marker1);
  // cluster.addLayer(marker2);
  // cluster.addLayer(marker3);

  // map.addLayer(cluster);

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
