export function drawRoute(map, destinationLat, destinationLng){
    //need current GPS
    // if(window.currentLat == null || window.currentLng == null){
    //     alert("Current location is not ready yet.");
    //     return;
    // }

    //nedd destination from map click(set in map.js)
    if(destinationLat == null || destinationLng == null){
        alert("Please click on the map to select a destination.");
        return;
    }

    const osrmBikeRouter = L.Routing.osrmv1({
        serviceUrl: 'http://localhost:5000/route/v1',
        profile: 'bike',//profile letsgoo
    })

    //remove old route if exists
    if(window.routingControl){
        map.removeControl(window.routingControl);
    }

    //create new route from GPS to clicked point
    window.routingControl = L.Routing.control({
        router: osrmBikeRouter,
        addWayPoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        lineOptions: {
            styles: [{ color: "red", opacity: 0.7, weight: 8 }],
        },
        waypoints: [
            // L.latLng(window.currentLat, window.currentLng),
            L.latLng(34.98493616431302, 135.75248977767515),
            L.latLng(destinationLat, destinationLng),
        ],
        createMarker: function() { return null; },

    }).addTo(map);
    
}