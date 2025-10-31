export function addLayers(MAP) {
    const cyclingLayer = L.tileLayer(
        'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
        {
            maxZoom: 25,
            attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            detectRetina: true,
        }
    );
    MAP.addLayer(cyclingLayer);

    const satelliteLayer = L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
            maxZoom: 25,
            detectRetina: true,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        },
    );  

    // Adds the layers
    const baseMaps = {
        'Cycling': cyclingLayer,
        'Google Satellite': satelliteLayer,
    };
    const overlayMaps = {};

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false,
        position: 'bottomright',
    }).addTo(MAP);
};