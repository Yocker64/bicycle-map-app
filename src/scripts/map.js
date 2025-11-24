import '../styles/styles.css';
import '../styles/map.css';
import '../styles/mapstyles.css';
import '../styles/map_elements/MarkerCluster.css';
import '../styles/map_elements/MarkerCluster.Default.css';

import {
  northLimit,
  southLimit,
  eastLimit,
  westLimit,
} from './mapUtilities/mapData';

import { addLayers } from './mapUtilities/layers';
import { addPolyline } from './mapUtilities/polylines';
import { addMarkers } from './mapUtilities/points';
import { addUserMarker } from './mapUtilities/userMarker';
import { initGPS } from './mapUtilities/gpsRealTime';
import {drawRoute} from './mapUtilities/routingMachine';

document.addEventListener('DOMContentLoaded', () => {
  const config = {
    minZoom: 2,
    maxZoom: 19,
    zoomControl: false,
    zoomSnap: 0.5,
    doubleClickZoom: false,
  };

  // calling map
  const lat = 34.98493616431302;
  const lng = 135.75248977767515;

  const initialZoom = 15;
  // eslint-disable-next-line no-undef
  const map = L.map('map', config).setView(
    [lat, lng],
    initialZoom,
  );
  // map.setMaxBounds([
  //   [northLimit, eastLimit],
  //   [southLimit, westLimit],
  // ]);

  // This adds all of the lines we are gonna use for the routes and cycle lanes
  addLayers(map);
  addPolyline(map);
  addMarkers(map);
  addUserMarker(map);
  initGPS(map);

  // This removes the context menu for all the images
  document.querySelectorAll('img').forEach((img) => {
    img.style.userSelect = 'none';
    img.style.webkitTouchCallout = 'none';
    img.addEventListener('contextmenu', (evt) => {
      evt.preventDefault();
      return false;
    });
  });
  
  //Saving clicked coordinates for routing
  window.destinationLat = null;
  window.destinationLng = null; // this is being saved in browser when it refreshes it disappear, it might be good idea who knows?

  //This will make popups in where it clicked on
  var popup =L.popup();
  function onMapClick(e){
    window.destinationLat = e.latlng.lat;
    window.destinationLng = e.latlng.lng;
    popup
      .setLatLng(e.latlng)
      .setContent('<button id="go-button">Go</button>')
      .openOn(map);
    //console.log(e.latlng);
    setTimeout(()=>{
      document.getElementById('go-button').onclick = () => {
        drawRoute(map);
      }
    }, 0)
  }
  map.on('click', onMapClick);
});
