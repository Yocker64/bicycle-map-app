/* eslint-disable no-undef */

// Минимал сайжруулалт:
// - watchPosition
// - throttle: ойр ирсэн update-үүдийг алгасна (MIN_GAP_MS)
// - EMA smoothing: координатыг жигнэж зөөллөнө (ALPHA)
// - Recenter only when good: accuracy сайжрах үед л төвлөрүүлнэ (THRESH)

export function initGPS(MAP) {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return;
  }

  // Тохируулж болно
  const MIN_GAP_MS = 1000; // 1 сек тутамд л UI-г шинэчилнэ
  const ALPHA = 0.3;       // 0.2–0.5 орчим туршаарай (их байх тусам “шингээлт” бага)
  const THRESH = 60;       // 60м-с сайн үед л map-ийг төвлөрүүлнэ

  let lastTs = 0;
  let marker = null;
  let accCircle = null;
  let bestAcc = Infinity;

  // EMA state
  let emaLat = null;
  let emaLon = null;

  function smooth(lat, lon) {
    if (emaLat == null) {
      emaLat = lat; emaLon = lon;
      return [lat, lon];
    }
    emaLat = ALPHA * lat + (1 - ALPHA) * emaLat;
    emaLon = ALPHA * lon + (1 - ALPHA) * emaLon;
    return [emaLat, emaLon];
  }

  function update(pos) {
    const now = Date.now();
    if (now - lastTs < MIN_GAP_MS) return; // throttle
    lastTs = now;

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const acc = pos.coords.accuracy || 9999;

    const [sLat, sLon] = smooth(lat, lon); // зөөллөмж координат

    // хуучныг цэвэрлэх
    if (marker) MAP.removeLayer(marker);
    if (accCircle) MAP.removeLayer(accCircle);

    marker = L.marker([sLat, sLon]).addTo(MAP).bindPopup("You are here");

    accCircle = L.circle([sLat, sLon], {
      radius: acc,      // accuracy муу → том тойрог; сайн → жижиг
      stroke: false,
      fillOpacity: 0.2
    }).addTo(MAP);

    // зөвхөн сайн үед л төвлөрүүлнэ (үсрэлтийг багасгана)
    if (acc <= THRESH || acc < bestAcc) {
      MAP.setView([sLat, sLon], MAP.getZoom(), { animate: true });
      if (acc < bestAcc) bestAcc = acc;
    }
  }

  navigator.geolocation.watchPosition(
    update,
    (err) => console.log("Geolocation error:", err),
    { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
  );
}
