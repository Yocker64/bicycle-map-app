import gpsImg from '../../img/icons/gps.png';
import gpsControlImg from '../../img/map-ui/gps-control-icon.png';

export function initGPS(MAP) {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by this browser.');
    return;
  }

  let marker = null;
  let accuracyCircle = null;
  let bestAcc = Infinity;

  let lat;
  let lon;

  let gpsLoadedOnce = false;
  let followGps = false;

  const gpsIcon = L.divIcon({
    html: `<img src="${gpsImg}" style="width: 25px; height: 25px; border: 3px solid white;">`,
    className: 'gps-icon',
    iconSize: [24, 24],
    iconAnchor: [10, 10],
  });

  const gpsControl = L.Control.extend({
    options: {
      position: 'bottomright',
    },
    onAdd(MAP) {
      const btn = L.DomUtil.create('img');
      btn.src = gpsControlImg;
      btn.className = 'gps-button';
      btn.draggable = false;

      btn.onclick = function () {
        if (followGps === true) {
          followGps = false;
          btn.className = 'gps-button leaflet-control inactive';
        } else {
          followGps = true;
          MAP.setView([lat, lon], MAP.getZoom(), { animate: true });
          btn.className = 'gps-button leaflet-control active';
        }
        console.log(followGps);
      };
      return btn;
    },
  });

  MAP.addControl(new gpsControl());

  // gps shit i dont understand
  const RECENTER_THRESHOLD = 60;

  function update(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const acc = position.coords.accuracy || 9999;

    window.currentLat = lat;
    window.currentLng = lon;

    if (marker) MAP.removeLayer(marker);
    if (accuracyCircle) MAP.removeLayer(accuracyCircle);

    marker = L.marker([lat, lon], { icon: gpsIcon }).addTo(MAP);
    accuracyCircle = L.circle([lat, lon], {
      radius: acc,
      stroke: false,
      fillOpacity: 0.2,
    }).addTo(MAP);

    if (acc <= RECENTER_THRESHOLD || acc < bestAcc) {
      bestAcc = Math.min(bestAcc, acc);
    }

    // Sets map view to current location if the gps loads for the first time
    if ((gpsLoadedOnce === false && lat != null) || followGps === true) {
      MAP.setView([lat, lon], MAP.getZoom(), { animate: true });
      gpsLoadedOnce = true;
    }
  }

  const watchId = navigator.geolocation.watchPosition(
    update,
    (err) => console.log('Geolocation error:', err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000,
    },
  );
}
