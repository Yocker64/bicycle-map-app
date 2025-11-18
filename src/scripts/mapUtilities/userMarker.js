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

        const userMarkerPopup = document.createElement('div');

        const userMarkerLink = document.createElement('a');
        userMarkerLink.href = `https://www.google.com/maps/place/${latStr},${lngStr}`;
        userMarkerLink.target = "_blank";
        userMarkerLink.textContent = "Google Mapsで開く";

        userMarkerPopup.appendChild(userMarkerLink);
        userMarkerPopup.className = 'user-marker-popup';

        // const markerPopup = L.popup({
        //     content: `
        //         <a href="https://www.google.com/maps/place/${latStr},${lngStr}" target="_blank">Google Mapsで開く</a>
        //     `,
        //     className: 'user-marker-popup',
        //     minWidth: 150,
        //     autoClose: false,
        //     closeOnClick: false,
        //     closeButton: true,
        //     autoPanPaddingTopLeft: [10, 80],
        //     autoPanPaddingBottomRight: [10, 10],
        // });

        const marker = new L.marker(e.latlng, {
            keyboard: false,
            icon: markerIcon,
        })
        // .bindPopup(markerPopup)
        .addTo(map);
        document.querySelector('body').appendChild(userMarkerPopup);

        // marker.openPopup();

        const markers = document.querySelectorAll('.user-marker');
        const popup = document.querySelectorAll('.user-marker-popup');
        if (markers.length > 1) {
            document.querySelector('.user-marker').remove();
        }
        if (popup.length > 1) {
            document.querySelector('.user-marker-popup').remove();
        }
    }

    map.on("click", addMarker);
}