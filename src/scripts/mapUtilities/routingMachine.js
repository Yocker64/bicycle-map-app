import icon from '../../img/map-ui/user-marker.png';

export function drawRoute(map, e){
    //need current GPS
    if(window.currentLat == null || window.currentLng == null){
        alert("Current location is not ready yet.");
        return;
    }

    const markerIcon = L.divIcon({
        html: `<img src="${icon}" style="width: 40px; height: 40px; filter: hue-rotate(130deg)">`,
        className: 'destination-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    const destinationLat = e.latlng.lat;
    const destinationLng = e.latlng.lng;

    const root = document.querySelector(':root');
    root.style.setProperty('--map-height', '70vh');
    
    const marker = new L.marker(e.latlng, {
        keyboard: false,
        icon: markerIcon,
    }).addTo(map);

    const osrmBikeRouter = L.Routing.osrmv1({
        serviceUrl: 'http://localhost:5000/route/v1',
        profile: 'bike',//profile letsgoo
    })

    //remove old route if exists
    if(window.routingControl) {
        if (document.querySelectorAll('.destination-marker').length > 1) document.querySelector('.destination-marker').remove();
        map.removeControl(window.routingControl);
    };

    //create new route from GPS to clicked point
    window.routingControl = L.Routing.control({
        router: osrmBikeRouter,
        addWayPoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        collapsible: true,
        lineOptions: {
            styles: [{ color: "var(--yellow)", opacity: 1, weight: 8 }],
        },
        waypoints: [
            L.latLng(window.currentLat, window.currentLng),
            // L.latLng(34.98493616431302, 135.75248977767515),
            L.latLng(destinationLat, destinationLng),
        ],
        createMarker: function() { return null; },

    }).addTo(map);

    document.querySelector('.leaflet-routing-collapse-btn').addEventListener(
        'click', () => {
            map.removeControl(window.routingControl);
            document.querySelector('.destination-marker').remove();

            root.style.setProperty('--map-height', '100vh');
        }
    );

    map.fitBounds([
        [destinationLat, destinationLng],
        [window.currentLat, window.currentLng]
    ],
    {
        paddingTopLeft: [50, 100],
        paddingBottomRight: [100, 250],
    });
}