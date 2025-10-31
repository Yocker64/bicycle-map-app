export function addLayers(MAP) {
    const cyclingLayer = L.tileLayer(
        'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
        {
            maxZoom: 25,
            attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            detectRetina: true,
        }
    );
    MAP.addLayer(cyclingLayer);

    const satelliteLayer = L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
            maxZoom: 25,
            attribution: 'Google Maps',
            detectRetina: true,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        },
    );  

    // Adds the layers
    const baseMaps = {
        '<img class="layer-control-image" src="https://c.tile-cyclosm.openstreetmap.fr/cyclosm/16/57480/25961.png" width="200px">': cyclingLayer,
        '<img class="layer-control-image" src="http://mt1.google.com/vt/lyrs=s&x=57480&y=25961&z=16" width="200px">': satelliteLayer,
    };
    const overlayMaps = {};

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false,
        position: 'topright',
    }).addTo(MAP);
};