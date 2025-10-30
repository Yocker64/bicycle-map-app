/* eslint-disable no-undef */
import '../styles/fontsAndReset.css';
import '../styles/styles.css';
import '../styles/mapstyles.css';
import { addPolyline } from './mapUtilities/polyline';
import { addMarkers } from './mapUtilities/points';
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
    [35.08720985235213, 135.85607464186808],
  ]);

  /*= =============================================
              TILE LAYER and WMS
  ================================================ */
  // defaultLayer layer
  // const defaultLayer = L.tileLayer(
  //   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //   {
  //     attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   },
  // );
  // defaultLayer.addTo(MAP);
  // MAP.addLayer(defaultLayer);

  const cyclingLayer = L.tileLayer(
    'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      attribution:
        '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  );
  // cyclingLayer.addTo(MAP);
  MAP.addLayer(cyclingLayer);

  // google street
  // const googleLayer = L.tileLayer(
  //   'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  //   {
  //     maxZoom: 18,
  //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  //   },
  // );

  // google satellite
  const satelliteLayer = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
  );

  /*= =============================================
                  LAYER CONTROL
  ================================================ */
  const baseMaps = {
    // 'Default': defaultLayer,
    Cycling: cyclingLayer,
    // 'Google Street': googleLayer,
    'Google Satellite': satelliteLayer,
  };
  const overlayMaps = {};

  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(MAP);

  // This adds all of the lines we are gonna use for the routes and cycle lanes
  addMarkers(MAP);
  addPolyline(MAP);
  initGPS(MAP); // resets location per one second
});
