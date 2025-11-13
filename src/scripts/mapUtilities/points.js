import 'leaflet.markercluster';

import { imagesDescsLinks, DataAccess } from './pointsData';

import konbiniIcon from '../../img/icons/shopping-bag.png';
import repairIcon from '../../img/icons/wrench.png';

export function addMarkers(map) {
  let markerCluster = L.markerClusterGroup({
    maxClusterRadius: 100,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 15,
  });
  
  const createIcon = (category) =>
    L.divIcon({
      html: `<img src="${category}" style="width: 25px; height: 25px;">`,
      className: 'custom-colored-marker',
      iconSize: [24, 24],
      iconAnchor: [10, 10],
    });

  const categoryImages = {
    konbinis: konbiniIcon,
    repair: repairIcon,
  };

                                              

  // Create feature groups for each category
  const featureGroups = {};

  // Initialize feature groups and add markers
  Object.keys(imagesDescsLinks).forEach((category) => {
    featureGroups[category] = new L.FeatureGroup(); 

    imagesDescsLinks[category].forEach((item) => {
      var markerPopup = L.popup({
        content: `
            ${item.imageSrc ? `<div class="image-wrapper"><img src="${item.imageSrc}" alt="Location image"></div>` : ''}
            <p>${item.desc}</p>
            ${item.link ? `<a href="${item.link}" target="_blank">Google Maps</a>` : ''}
        `,
        minWidth: 150,
        maxWidth: 150,
        closeButton: false,
        autoPanPaddingTopLeft: [10, 80],
        autoPanPaddingBottomRight: [10, 10,]
      });

      const marker = L.marker([item.lat, item.lng],
        { icon: createIcon(categoryImages[category] || 'gray')}
      ).bindPopup(markerPopup);

      markerCluster.addLayer(marker);

      featureGroups[category].addLayer(marker);
    });
  });

  map.addLayer(markerCluster);

  // Create overlay maps object for layer control
  const overlayMaps = {};
  Object.keys(featureGroups).forEach((category) => {
    overlayMaps[category] = featureGroups[category];
  });

  // centering a group of markers
  // map.on('layeradd layerremove', () => {
  //   // Create new empty bounds
  //   const bounds = new L.LatLngBounds();
  //   // Iterate the map's layers
  //   map.eachLayer((layer) => {
  //     // Check if layer is a featuregroup
  //     if (layer instanceof L.FeatureGroup) {
  //       // Extend bounds with group's bounds
  //       bounds.extend(layer.getBounds());
  //     }
  //   });

  //   // Check if bounds are valid (could be empty)
  //   if (bounds.isValid()) {
  //     // Valid, fit bounds
  //     map.flyToBounds(bounds, { padding: [20, 20] });
  //   }
  // });

  // Custom control with buttons
  L.Control.CustomButtons = L.Control.Layers.extend({
    onAdd() {
      this._initLayout();
      this._addMarker();
      this._removeMarker();
      this._update();
      return this._container;
    },
    _addMarker() {
      this.createButton('Show All', 'add-button');
    },
    _removeMarker() {
      this.createButton('Hide All', 'remove-button');
    },
    createButton(text, className) {
      const elements = this._container.getElementsByClassName(
        'leaflet-control-layers-list',
      );
      const button = L.DomUtil.create(
        'button',
        `btn-markers ${className}`,
        elements[0],
      );
      button.textContent = text;

      L.DomEvent.on(button, 'click', (e) => {
        const checkboxes = document.querySelectorAll(
          '.leaflet-control-layers-overlays input[type=checkbox]',
        );

        // Remove/add all layers from map when click on button
        [].slice.call(checkboxes).forEach((checkbox) => {
          const isChecked = checkbox.checked;
          const shouldCheck = text === 'Show All';

          if (isChecked !== shouldCheck) {
            checkbox.checked = shouldCheck;
            checkbox.dispatchEvent(new Event('change'));
          }
        });
      });
    },
  });

  // Add layer control with custom buttons
  // new L.Control.CustomButtons(null, overlayMaps, {
  //   collapsed: true,
  // }).addTo(map);

  // Log category statistics
  console.log('Category Statistics:', DataAccess.getCategoryStats());
}
