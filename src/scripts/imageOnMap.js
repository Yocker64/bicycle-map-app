export function addImagesOnMap() {
  /* eslint-disable no-undef */
  /**
   * image on map
   */

  // config map
  let config = {
    minZoom: 1,
    maxZoom: 18,
  };
  // magnification with which the map will start
  const zoom = 15;
  // co-ordinates
  const lat = 34.98493616431302;
  const lng = 135.75248977767515;

  // calling map
  const map = L.map("map", config).setView([lat, lng], zoom);

  // Used to load and display tile layers on the map
  // Most tile servers require attribution, which you can set under `Layer`
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // new icon
  const funny = L.icon({
    iconUrl: "http://grzegorztomicki.pl/serwisy/pin.png",
    iconSize: [50, 58], // size of the icon
    iconAnchor: [20, 58], // changed marker icon position
    popupAnchor: [0, -60], // changed popup position
  });

  // custom popup image + text
  const customPopup =
    '<div class="customPopup"><figure><img src="https://www.kcg.ac.jp/images/facilities/school_building_ekimae2-2x.jpg"><figcaption>Source: wikipedia.org</figcaption></figure><div>京都コンピュータ学院は1963年に創立された日本で最初のコンピュータ教育機関である。京都大学理学部（多くは宇宙物理学教室）出身の有志により設立された。 <a href="https://ja.wikipedia.org/wiki/%E4%BA%AC%E9%83%BD%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF%E5%AD%A6%E9%99%A2" target="_blank">→ show more</a></div></div>';

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
