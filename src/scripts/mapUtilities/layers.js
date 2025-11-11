import defaultViewImg from '../../img/map-ui/default-view.png';
import satelliteViewImg from '../../img/map-ui/satellite-view.jpeg';

export function addLayers(MAP) {
  var OpenStreetMap_CAT = L.tileLayer('https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png', {
    maxZoom: 25,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    detectRetina: true,
  });

  var bikeLanesLayer = L.tileLayer(
    'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png',
    {
      maxZoom: 25,
      detectRetina: true,
      className: "bike-lanes-layer",
    },
  );

  var satelliteLayer = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    {
      maxZoom: 25,
      attribution: 'Google Maps',
      detectRetina: true,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
  );
  MAP.addLayer(OpenStreetMap_CAT);
  MAP.addLayer(bikeLanesLayer);

  // Layer control
  const baseMaps = {
    [`<img class="layer-control-image" src="${defaultViewImg}" width="200px">`]:
      OpenStreetMap_CAT,
    [`<img class="layer-control-image" src="${satelliteViewImg}" width="200px">`]:
      satelliteLayer,
  };
  const overlayMaps = {
    "lanes": bikeLanesLayer
  };

  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false,
      position: 'bottomright',
    })
    .addTo(MAP);
}