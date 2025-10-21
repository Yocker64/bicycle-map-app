import './styles/fontsAndReset.css';
import './styles/styles.css';
import { addMap } from './scripts/gpsRealTime';
import { myFunc } from './scripts/battoFunction';

document.addEventListener('DOMContentLoaded', () => {
  myFunc();
});

function addScript(src, type) {
  const s = document.createElement(type);
  s.setAttribute('src', src);

  if (type === 'script') {
    // s.setAttribute("defer", true);
    document.body.appendChild(s);
  } else {
    s.setAttribute('rel', 'stylesheet');
    document.head.appendChild(s);
  }
}

const btnActive = document.querySelector('.btn-active');
const mapContainer = document.querySelector('#map');
btnActive.addEventListener('click', () => {
  // remove elements from map container
  mapContainer.textContent = '';
  addScript(
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.min.js',
    'script',
  );
  setTimeout(() => {
    addScript('./script.js', 'script');
  }, 1000);
});

addMap();
