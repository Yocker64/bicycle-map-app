import '../styles/fontsAndReset.css';
import '../styles/styles.css';
import '../styles/mapstyles.css';
import { addMap } from './gpsRealTime';
import { addImagesOnMap } from './mapUtilities/imageOnMap';
import { addPolyline } from './mapUtilities/polyline';
import { addMarkers } from './mapUtilities/points';

document.addEventListener('DOMContentLoaded', () => {
  // config map
  const config = {
    minZoom: 12,
    maxZoom: 18,
  };
  // magnification with which the map will start
  const zoom = 15;

  // calling map
  const MAP = L.map('map', config).setView(
    [34.98493616431302, 135.75248977767515],
    zoom,
  );

  // This adds all of the lines we are gonna use for the routes and cycle lanes
  addMarkers(MAP);
  addPolyline(MAP);

  // Add the images of points of interest
});
