import '../styles/fontsAndReset.css';
import '../styles/styles.css';
import { addMap } from './gpsRealTime';
import { addImagesOnMap } from './imageOnMap';

// JavaScript for toggling the mobile menu and the tours dropdown
document.addEventListener('DOMContentLoaded', () => {
  addImagesOnMap();
});

// function addScript(src, type) {
//   const s = document.createElement(type);
//   s.setAttribute('src', src);

//   if (type === 'script') {
//     // s.setAttribute("defer", true);
//     document.body.appendChild(s);
//   } else {
//     s.setAttribute('rel', 'stylesheet');
//     document.head.appendChild(s);
//   }
// }

// const btnActive = document.querySelector('.btn-active');
// const mapContainer = document.querySelector('#map');
// btnActive.addEventListener('click', () => {
//   // remove elements from map container
//   mapContainer.textContent = '';
//   addScript(
//     'https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.min.js',
//     'script',
//   );
//   setTimeout(() => {
//     addScript('./script.js', 'script');
//   }, 1000);
// });

// addMap();
