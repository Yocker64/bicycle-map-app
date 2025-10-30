/* eslint-disable no-undef */

// resets location every second
// will draw marker and accuracy circle
export function initGPS(MAP) {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by this browser.');
    return;
  }

  let marker = null;
  let accuracyCircle = null;

  function updatePosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const acc = position.coords.accuracy; // by meter

    // if there is old marker, it will remove it
    if (marker) {
      MAP.removeLayer(marker);
    }
    // if there is old accuracy circle, it will remove it
    if (accuracyCircle) {
      MAP.removeLayer(accuracyCircle);
    }

    // new marker
    marker = L.marker([lat, lon]).addTo(MAP).bindPopup('You are here');

    // new accuracy circle (dependent on accuracy)
    accuracyCircle = L.circle([lat, lon], {
      radius: acc, // by meter
      stroke: false, // no border
      fillOpacity: 0.2, // fancy color configuration
    }).addTo(MAP);

    // If u wanna see debug:
    // console.log("Lat:", lat, "Lon:", lon, "Acc:", acc, "m");
  }

  function tick() {
    navigator.geolocation.getCurrentPosition(
      updatePosition,
      (err) => {
        console.log('Geolocation error:', err);
      },
      {
        enableHighAccuracy: true, // best GPS
        maximumAge: 0,
        timeout: 10000,
      },
    );
  }

  // first read
  tick();

  // constantly resets
  setInterval(tick, 1000);
}
