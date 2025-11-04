/* eslint-disable no-undef */

export function initGPS(MAP) {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return;
  }

  let marker = null;
  let accuracyCircle = null;
  let bestAcc = Infinity;           // одоогийн хамгийн сайн (бага) accuracy

  // муу fix-үүд дээр map-г үсчүүлэхгүйн тулд босго (метр)
  const RECENTER_THRESHOLD = 60;    // 60м-с муу бол төв рүү бүү зөь

  function update(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const acc = position.coords.accuracy || 9999;

    // marker/circle шинэчлэх
    if (marker) MAP.removeLayer(marker);
    if (accuracyCircle) MAP.removeLayer(accuracyCircle);

    marker = L.marker([lat, lon]).addTo(MAP).bindPopup("You are here");
    accuracyCircle = L.circle([lat, lon], {
      radius: acc,      // accuracy их → том тойрог
      stroke: false,
      fillOpacity: 0.2
    }).addTo(MAP);

    // зөвхөн харьцангуй сайн үед л төвлөрүүлье
    // 1) acc босгоос сайн байвал
    // 2) эсвэл өмнөх bestAcc-аа сайжруулсан бол
    if (acc <= RECENTER_THRESHOLD || acc < bestAcc) {
      MAP.setView([lat, lon], MAP.getZoom(), { animate: true });
      bestAcc = Math.min(bestAcc, acc);
    }

    // console.log(`lat:${lat} lon:${lon} acc:${acc}m`);
  }

  // watchPosition: илүү тогтвортой, хурдан шинэчлэлт
  const watchId = navigator.geolocation.watchPosition(
    update,
    (err) => console.log("Geolocation error:", err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000
    }
  );

  // (заавал биш) хэрэв дараа нь зогсоох хэрэг гарвал:
  // return () => navigator.geolocation.clearWatch(watchId);
}
