/* eslint-disable no-undef */
import '../styles/fontsAndReset.css';
import '../styles/styles.css';
import '../styles/mapstyles.css';
import { addPolyline } from './mapUtilities/polyline';
import { addMarkers } from './mapUtilities/points';

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

  /*= =============================================
              TILE LAYER and WMS
  ================================================ */
  // osm layer
  const osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  );
  osm.addTo(MAP);
  MAP.addLayer(osm);

  // dark map
  const dark = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 18,
    },
  );
  // dark.addTo(map)

  // google street
  const googleStreets = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
  );
  // googleStreets.addTo(map);

  // google satellite
  const googleSat = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
  );
  googleSat.addTo(MAP);

  const wms = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'geoapp:admin',
    format: 'image/png',
    transparent: true,
    attribution: 'wms test',
  });

  /*= =============================================
                  LAYER CONTROL
  ================================================ */
  const baseMaps = {
    OSM: osm,
    Dark: dark,
    'Google Street': googleStreets,
    'Google Satellite': googleSat,
  };
  const overlayMaps = {};

  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(MAP);

  // This adds all of the lines we are gonna use for the routes and cycle lanes
  addMarkers(MAP);
  addPolyline(MAP);

  // Add the images of points of interest
});
