import pointerImg from '../../pictures/map-point.svg';

export function addImagesOnMap(map, imageSrc, desc, link) {
  /* eslint-disable no-undef */
  /**
   * image on map
   */
  // Used to load and display tile layers on the map
  // Most tile servers require attribution, which you can set under `Layer`
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // new icon
  const funny = L.icon({
    iconUrl: pointerImg,
    iconSize: [50, 50], // size of the icon
    iconAnchor: [0, 0], // changed marker icon position
    popupAnchor: [0, 0], // changed popup position
  });

  // custom popup image + text
  const customPopup = `<div class="customPopup"><figure><img src=${imageSrc}><figcaption>Source: wikipedia.org</figcaption></figure><div>${desc}<a href="${link}" target="_blank">→ show more</a></div></div>`;

  // specify popup options
  const customOptions = {
    minWidth: '220', // set max-width
    keepInView: true, // Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
  };

  // create marker object, pass custom icon as option, pass content and options to popup, add to map
  L.marker([34.98493616431302, 135.75248977767515], {
    icon: funny,
  })
    .bindPopup(customPopup, customOptions)
    .on('click', clickZoom)
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
