export function initGPS(MAP) {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return;
  }

  let marker = null;
  let accuracyCircle = null;
  let bestAcc = Infinity;

  let lat;
  let lon;

  var gpsIcon = L.divIcon({
    html: `<img src="https://cdn-icons-png.flaticon.com/512/14025/14025195.png" class="gps-icon" style="width: 40px; height: 40px; transform: translate(-15px, -15px);">`,
  })

  const RECENTER_THRESHOLD = 60;

  function update(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const acc = position.coords.accuracy || 9999;

    if (marker) MAP.removeLayer(marker);
    if (accuracyCircle) MAP.removeLayer(accuracyCircle);

    marker = L.marker(
      [lat, lon],
      {icon: gpsIcon}
    ).addTo(MAP);
    accuracyCircle = L.circle([lat, lon], {
      radius: acc,
      stroke: false,
      fillOpacity: 0.2
    }).addTo(MAP);

    if (acc <= RECENTER_THRESHOLD || acc < bestAcc) {
      bestAcc = Math.min(bestAcc, acc);
    }
  }

  const watchId = navigator.geolocation.watchPosition(
    update,
    (err) => console.log("Geolocation error:", err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000
    }
  );

  const customControl = L.Control.extend({
    options: {
      position: "bottomleft",
    },

    onAdd: function (MAP) {
      const btn = L.DomUtil.create("button");
      btn.title = "gps-button";
      btn.textContent = "";
      btn.className = "gps-button";
      btn.setAttribute(
        "style",
        "background-color: white; width: 50px; height: 50px; border: none; display: flex; cursor: pointer; justify-content: center; font-size: 2rem;"
      );

      btn.onclick = function () {
        MAP.setView([lat, lon], MAP.getZoom(), { animate: true });
      };
      return btn;
    },
  });

  MAP.addControl(new customControl());
}