import lines from './linesData.js'
// Global variable to store the polyline layer
let polylineLayer = null;

export function addPolyline(map) {
  /* eslint-disable no-undef */
  /**
   * Polyline with show/hide functionality
   */

  // Define array of points to use for line
  const points = [
    [34.99635656226577, 135.7323981442834],
    [34.996354357252464, 135.74123869756127],
    [34.996552791853354, 135.74894277323145],
    [34.996492398769384, 135.75208654192207],
    [34.998617623320214, 135.75199905011456],
    [34.998705056082976, 135.7524003697808],
    [34.996512214095766, 135.75267787807172],
    [34.99642827639192, 135.7595387363582],
    [34.9959782546342, 135.76694203803277],
    [34.994396786588645, 135.7756358653961],
  ];

  // Create polyline layer
  polylineLayer = L.polyline(points, {
    color: 'red',
    opacity: 0.7,
    weight: 5,
    lineCap: 'round',
    lineJoin: 'round',
  }).bindPopup('Route Path');

  // Add polyline to map by default
  polylineLayer.addTo(map);

  // Create and add control buttons
  createPolylineControls(map);
}

function createPolylineControls(map) {
  // Create a custom control for polyline buttons
  const PolylineControl = L.Control.extend({
    options: {
      position: 'topright',
    },

    // eslint-disable-next-line no-shadow
    onAdd(map) {
      const container = L.DomUtil.create(
        'div',
        'leaflet-bar leaflet-control polyline-control',
      );
      container.style.background = 'white';
      container.style.padding = '10px';
      container.style.borderRadius = '5px';
      container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

      // Show button
      const showButton = L.DomUtil.create(
        'button',
        'polyline-btn show-polyline',
        container,
      );
      showButton.innerHTML = 'Show Lines';
      showButton.style.display = 'block';
      showButton.style.marginBottom = '5px';
      showButton.style.padding = '8px 12px';
      showButton.style.backgroundColor = '#28a745';
      showButton.style.color = 'white';
      showButton.style.border = 'none';
      showButton.style.borderRadius = '4px';
      showButton.style.cursor = 'pointer';
      showButton.style.width = '100%';

      // Hide button
      const hideButton = L.DomUtil.create(
        'button',
        'polyline-btn hide-polyline',
        container,
      );
      hideButton.innerHTML = 'Hide Lines';
      hideButton.style.display = 'block';
      hideButton.style.padding = '8px 12px';
      hideButton.style.backgroundColor = '#dc3545';
      hideButton.style.color = 'white';
      hideButton.style.border = 'none';
      hideButton.style.borderRadius = '4px';
      hideButton.style.cursor = 'pointer';
      hideButton.style.width = '100%';

      // Toggle button (alternative approach)
      const toggleButton = L.DomUtil.create(
        'button',
        'polyline-btn toggle-polyline',
        container,
      );
      toggleButton.innerHTML = 'Toggle Lines';
      toggleButton.style.display = 'block';
      toggleButton.style.marginTop = '5px';
      toggleButton.style.padding = '8px 12px';
      toggleButton.style.backgroundColor = '#007bff';
      toggleButton.style.color = 'white';
      toggleButton.style.border = 'none';
      toggleButton.style.borderRadius = '4px';
      toggleButton.style.cursor = 'pointer';
      toggleButton.style.width = '100%';

      // Event handlers
      L.DomEvent.on(showButton, 'click', () => {
        showPolylines(map);
      });

      L.DomEvent.on(hideButton, 'click', () => {
        hidePolylines(map);
      });

      L.DomEvent.on(toggleButton, 'click', () => {
        togglePolylines(map);
      });

      // Prevent map events when clicking buttons
      L.DomEvent.disableClickPropagation(container);

      return container;
    },
  });

  // Add the control to the map
  new PolylineControl().addTo(map);
}

// Function to show all polylines
export function showPolylines(map) {
  if (polylineLayer && !map.hasLayer(polylineLayer)) {
    map.addLayer(polylineLayer);
    console.log('Polylines shown');
  }
}

// Function to hide all polylines
export function hidePolylines(map) {
  if (polylineLayer && map.hasLayer(polylineLayer)) {
    map.removeLayer(polylineLayer);
  }
}

// Function to toggle polylines
export function togglePolylines(map) {
  if (polylineLayer) {
    if (map.hasLayer(polylineLayer)) {
      map.removeLayer(polylineLayer);
    } else {
      map.addLayer(polylineLayer);
    }
  }
}

// Function to add multiple polylines
export function addMultiplePolylines(map, polylineData = []) {
  /* eslint-disable no-undef */
  if (!window.polylineGroup) {
    window.polylineGroup = L.layerGroup();
  }

  // Clear existing polylines
  window.polylineGroup.clearLayers();

  // Add new polylines
  polylineData.forEach((data, index) => {
    const polyline = L.polyline(data.points, {
      color: data.color || 'red',
      opacity: data.opacity || 0.7,
      weight: data.weight || 5,
      lineCap: 'round',
      lineJoin: 'round',
    }).bindPopup(data.popupText || `Route ${index + 1}`);

    window.polylineGroup.addLayer(polyline);
  });

  // Add to map
  window.polylineGroup.addTo(map);

  // Update the global polylineLayer reference
  polylineLayer = window.polylineGroup;

  // Ensure controls are created
  if (!document.querySelector('.polyline-control')) {
    createPolylineControls(map);
  }
}

// Function to get current polyline visibility
export function arePolylinesVisible(map) {
  return polylineLayer && map.hasLayer(polylineLayer);
}
