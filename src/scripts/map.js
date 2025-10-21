import '../styles/fontsAndReset.css';
import '../styles/styles.css';
import { addMap } from './gpsRealTime';
import { addImagesOnMap } from './imageOnMap';
import { addPolyline } from './polyline';

// JavaScript for toggling the mobile menu and the tours dropdown
document.addEventListener('DOMContentLoaded', () => {
  addImagesOnMap(
    34.98493616431302,
    135.75248977767515,
    'https://www.kcg.ac.jp/images/facilities/school_building_ekimae2-2x.jpg',
    '京都コンピュータ学院は1963年に創立された日本で最初のコンピュータ教育機関である。京都大学理学部（多くは宇宙物理学教室）出身の有志により設立された。',
    'https://ja.wikipedia.org/wiki/%E4%BA%AC%E9%83%BD%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF%E5%AD%A6%E9%99%A2',
  );
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
