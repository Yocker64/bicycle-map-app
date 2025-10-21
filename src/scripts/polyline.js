export function addPolyline() {
  /* eslint-disable no-undef */
  /**
   * Polyline
   */

  // config map
  const config = {
    minZoom: 7,
    maxZoom: 18,
  };
  // magnification with which the map will start
  const zoom = 18;
  // co-ordinates
  const lat = 52.22999;
  const lng = 21.01258;

  // calling map
  const map = L.map('map', config).setView([lat, lng], zoom);

  // Used to load and display tile layers on the map
  // Most tile servers require attribution, which you can set under `Layer`
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // define array of points to use for line
  const points = [
    [34.99635656226577, 135.7323981442834],
    [34.996354357252464, 135.74123869756127],
    [34.996552791853354, 135.74894277323145],
    [34.996492398769384, 135.75208654192207],
    [34.998617623320214, 135.75199905011456],
    [34.998705056082976, 135.7524003697808],
    [34.996512214095766, 135.75267787807172],
    [34.99642827639192, 135.7595387363582],
  ];

  // add polyline to map
  L.polyline(points, {
    color: 'red',
    opacity: 0.5,
    weight: 20,
  })
    .bindPopup('polygon')
    .addTo(map);
}
