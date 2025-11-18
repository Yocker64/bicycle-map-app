import icon from '../../img/map-ui/user-marker.png';

export function addUserMarker(map) {
    const markerIcon = L.divIcon({
        html: `<img src="${icon}" style="width: 34px; height: 34px;">`,
        className: 'user-marker',
        iconSize: [34, 34],
        iconAnchor: [17, 34],
    });



    function addMarker(e) {
        const latStr = JSON.stringify(e.latlng.lat);
        const lngStr = JSON.stringify(e.latlng.lng);

        const markerPopup = L.popup({
            content: `
                <a href="https://www.google.com/maps/place/${latStr},${lngStr}" target="_blank">Google Mapsで開く</a>
            `,
            minWidth: 150,
            maxWidth: 150,
            closeButton: false,
            autoPanPaddingTopLeft: [10, 80],
            autoPanPaddingBottomRight: [10, 10],
        });

        const marker = new L.marker(e.latlng, {
            keyboard: false,
            icon: markerIcon,
        })
        .bindPopup(markerPopup)
        .addTo(map);

        marker.openPopup();

        const markers = document.querySelectorAll('.user-marker');
        if (markers.length > 1) document.querySelector('.user-marker').remove();
    }

    map.on("click", addMarker);
}