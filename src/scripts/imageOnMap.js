import { addPolyline } from './polyline';

export function addImagesOnMap(lat, lng, imageSrc, desc, link) {
  /* eslint-disable no-undef */
  /**
   * image on map
   */

  // config map
  const config = {
    minZoom: 1,
    maxZoom: 18,
  };
  // magnification with which the map will start
  const zoom = 15;

  // calling map
  const map = L.map("map", config).setView([lat, lng], zoom);

  // Used to load and display tile layers on the map
  // Most tile servers require attribution, which you can set under `Layer`
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
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
    color: "red",
    opacity: 0.5,
    weight: 20,
  })
    .bindPopup("polygon")
    .addTo(map);

  // new icon
  const funny = L.icon({
    iconUrl: "http://grzegorztomicki.pl/serwisy/pin.png",
    iconSize: [50, 58], // size of the icon
    iconAnchor: [20, 58], // changed marker icon position
    popupAnchor: [0, -60], // changed popup position
  });

  // custom popup image + text
  const customPopup = `<div class="customPopup"><figure><img src=${imageSrc}><figcaption>Source: wikipedia.org</figcaption></figure><div>${desc}<a href="${link}" target="_blank">→ show more</a></div></div>`;

  // specify popup options
  const customOptions = {
    minWidth: "220", // set max-width
    keepInView: true, // Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
  };

  // create marker object, pass custom icon as option, pass content and options to popup, add to map
  L.marker([34.98493616431302, 135.75248977767515], {
    icon: funny,
  })
    .bindPopup(customPopup, customOptions)
    .on("click", clickZoom)
    .addTo(map);

  // center map when click on marker
  function clickZoom(e) {
    map.setView(e.target.getLatLng(), zoom);
  }

  // add image to map ;)
  const imageBounds = [
    [34.98493616431302, 135.75248977767515],
    [34.96893616431302, 135.7364897776755],
  ];

  L.imageOverlay(imageUrl, imageBounds, { opacity: 1 }).addTo(map);
}
