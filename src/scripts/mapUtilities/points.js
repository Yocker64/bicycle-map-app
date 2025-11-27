import 'leaflet.markercluster';

import { imagesDescsLinks, DataAccess } from './pointsData';

import konbiniIcon from '../../img/icons/shopping-bag.png';
import repairIcon from '../../img/icons/wrench.png';
import parkIcon from '../../img/icons/park.png';

export function addMarkers(map) {
  // Marker clusters declarations
  const markerClusterOptions = {
    maxClusterRadius: 100,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 15,
  };
  const konbMarkerCluster = L.markerClusterGroup(markerClusterOptions);
  const repairMarkerCluster = L.markerClusterGroup(markerClusterOptions);
  const parkMarkerCluster = L.markerClusterGroup(markerClusterOptions);
  const masterMarkerCluster = L.markerClusterGroup(markerClusterOptions);

  // Marker icons
  const createIcon = (category) =>
    L.divIcon({
      html: `<img src="${category}" style="width: 20px; height: 20px;">`,
      className: 'custom-colored-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 5],
    });
  const categoryImages = {
    konbinis: konbiniIcon,
    repair: repairIcon,
    parking: parkIcon,
  };

  // Create icons and popups for each marker, and add it to its respective cluster
  Object.keys(imagesDescsLinks).forEach((category) => {
    imagesDescsLinks[category].forEach((item) => {
      const markerPopup = L.popup({
        content: `
            ${item.imageSrc ? `<div class="image-wrapper"><img src="${item.imageSrc}" alt="Location image"></div>` : ''}
            <p>${item.desc}</p>
            ${item.link ? `<a href="${item.link}" target="_blank">Google Mapsで開く</a>` : ''}
        `,
        minWidth: 150,
        maxWidth: 150,
        closeButton: true,
        closeOnClick: true,
        autoPanPaddingTopLeft: [10, 80],
        autoPanPaddingBottomRight: [25, 10],
      });

      const marker = L.marker([item.lat, item.lng], {
        icon: createIcon(categoryImages[category] || 'gray'),
      }).bindPopup(markerPopup);

      switch (category) {
        case 'konbinis':
          konbMarkerCluster.addLayer(marker);
          break;
        case 'repair':
          repairMarkerCluster.addLayer(marker);
          break;
        case 'parking':
          parkMarkerCluster.addLayer(marker);
          break;
        default:
          break;
      }
    });
  });

  // Marker control declarations
  const markerControlIcon = document.querySelector('.marker-control-toggle');
  markerControlIcon.addEventListener('click', () => {
    const controlDiv = document.querySelector('.marker-control');
    controlDiv.classList.contains('hidden')
      ? controlDiv.classList.remove('hidden')
      : controlDiv.classList.add('hidden');
  });

  const markerControl = L.Control.extend({
    options: {
      position: 'topright',
    },
    onAdd() {
      const div = L.DomUtil.create('div');
      L.DomEvent.disableClickPropagation(div);
      
      const konbBtn = this.createButton('コンビニ', konbMarkerCluster, 'konbini');
      const repairBtn = this.createButton('修理店', repairMarkerCluster, 'repair');
      const parkingBtn = this.createButton('駐輪場', parkMarkerCluster, 'park');

      div.className = 'marker-control hidden';
      div.appendChild(konbBtn);
      div.appendChild(repairBtn);
      div.appendChild(parkingBtn);

      return div;
    },
    createButton(label, cluster, id) {
      const btn = L.DomUtil.create('button');
      btn.dataset.id = id;
      btn.textContent = label;

      if (localStorage.getItem(id) == false) {
        this.removeClusterLayer(cluster, btn, id);
      } else {
        this.addClusterLayer(cluster, btn, id);
      }

      btn.onclick = () => {
        if (btn.classList.contains('unchecked')) {
          this.addClusterLayer(cluster, btn, id);
        } else {
          this.removeClusterLayer(cluster, btn, id);
        }
      };
      return btn;
    },
    addClusterLayer(cluster, btn, id) {
      masterMarkerCluster.addLayer(cluster);
      map.addLayer(masterMarkerCluster);

      btn.classList.remove('unchecked');
      btn.classList.add('checked');

      localStorage.setItem(id, 1);
    },
    removeClusterLayer(cluster, btn, id) {
      masterMarkerCluster.removeLayer(cluster);
      map.addLayer(masterMarkerCluster);

      btn.classList.remove('checked');
      btn.classList.add('unchecked');

      localStorage.setItem(id, 0);
    },
  });
  map.addControl(new markerControl());

  // Log category statistics
  console.log('Category Statistics:', DataAccess.getCategoryStats());
}
