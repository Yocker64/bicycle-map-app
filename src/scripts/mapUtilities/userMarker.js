import icon from '../../img/map-ui/user-marker.png';

export function addUserMarker(map) {
    const markerIcon = L.divIcon({
        html: `<img src="${icon}" style="width: 34px; height: 34px;">`,
        className: 'user-marker',
        iconSize: [34, 34],
        iconAnchor: [17, 34],
    });

    const markerPopup = L.popup({
        content: `
            <p>shit</p>
            <a href="sample.com" target="_blank">Google Maps</a>
        `,
        minWidth: 150,
        maxWidth: 150,
        closeButton: false,
        autoPanPaddingTopLeft: [10, 80],
        autoPanPaddingBottomRight: [10, 10],
    });

    function addMarker(e) {
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