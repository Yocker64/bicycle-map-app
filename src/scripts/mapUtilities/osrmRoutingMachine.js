// src/scripts/mapUtilities/osrmRoutingMachine.js

export function initRoute(MAP) {
  // Helper to actually add the routing control once we know the origin
  const startRouting = (originLatLng) => {
    L.Routing.control({
        addWaypoints:false,
        draggableWaypoints:false,
        routeWhileDragging:false,
        waypoints: [
            originLatLng,                        // 1) current GPS (or fallback)
            L.latLng(34.978090, 135.807320)      // 2) таны туршилтын зорилтот цэг
        ],
      // Хэрэв хүсвэл өөрийн OSRM server рүү заана:
      // router: L.Routing.osrmv1({ serviceUrl: 'https://your-osrm.example/route/v1' })
    }).addTo(MAP);
  };

  // Try to use current device position as the first waypoint
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        startRouting(L.latLng(latitude, longitude));
      },
      // If user blocks GPS or it fails, use a fallback origin
      () => {
        startRouting(L.latLng(34.986838, 135.746815)); // fallback: Umekoji area
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  } else {
    // No geolocation in this browser → fallback
    startRouting(L.latLng(34.986838, 135.746815));
  }
}
