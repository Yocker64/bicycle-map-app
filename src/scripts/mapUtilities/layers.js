export function addLayers(MAP) {
  // var cyclOSM = L.tileLayer(
  //   'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
  //   {
  //     maxZoom: 25,
  //     attribution:
  //       '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //     detectRetina: true,
  //   },
  // );
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
    '<img class="layer-control-image" src="https://c.tile-cyclosm.openstreetmap.fr/cyclosm/16/57480/25961.png" width="200px">':
      OpenStreetMap_CAT,
    '<img class="layer-control-image" src="http://mt1.google.com/vt/lyrs=s&x=57480&y=25961&z=16" width="200px">':
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