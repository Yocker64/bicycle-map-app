import 'leaflet.markercluster';

import { imagesDescsLinks, DataAccess } from './pointsData';

import konbiniIcon from '../../img/icons/shopping-bag.png';
import repairIcon from '../../img/icons/wrench.png';

export function addMarkers(map) {
  // Marker clusters declarations
  let markerClusterOptions = {
    maxClusterRadius: 100,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 15,
  };
  let konbMarkerCluster = L.markerClusterGroup(markerClusterOptions);
  let repairMarkerCluster = L.markerClusterGroup(markerClusterOptions);
  let masterMarkerCluster = L.markerClusterGroup(markerClusterOptions);
  
  // Marker icons
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

  // Create icons and popups for each marker, and add it to its respective cluster
  Object.keys(imagesDescsLinks).forEach((category) => {
    imagesDescsLinks[category].forEach((item) => {
      const markerPopup = L.popup({
        content: `
            ${item.imageSrc ? `<div class="image-wrapper"><img src="${item.imageSrc}" alt="Location image"></div>` : ''}
            <p>${item.desc}</p>
            ${item.link ? `<a href="${item.link}" target="_blank">Google Maps</a>` : ''}
        `,
        minWidth: 150,
        maxWidth: 150,
        closeButton: true,
        closeOnClick: true,
        autoPanPaddingTopLeft: [10, 80],
        autoPanPaddingBottomRight: [10, 10],
      });

      const marker = L.marker(
        [item.lat, item.lng],
        {icon: createIcon(categoryImages[category] || 'gray')}
      ).bindPopup(markerPopup);

      switch (category) {
        case 'konbinis':
          konbMarkerCluster.addLayer(marker);
          break;
        case 'repair':
          repairMarkerCluster.addLayer(marker);
          break;
        default:
          break;
      };
    });
  });

  // Marker control declarations
  const markerControlIcon = document.querySelector('.marker-control-toggle');
  markerControlIcon.addEventListener('click', () => {
    const controlDiv = document.querySelector('.marker-control');
    controlDiv.classList.contains("hidden") ? controlDiv.classList.remove("hidden") : controlDiv.classList.add("hidden");
  });

  const markerControl = L.Control.extend({
    options: {
      position: "topright",
    },
    onAdd: function () {
      const div = L.DomUtil.create("div");
      let konbBtn = this.createButton("コンビニ", konbMarkerCluster);
      let repairBtn = this.createButton("修理店", repairMarkerCluster);
      let parkingBtn = this.createButton("駐輪場", repairMarkerCluster);

      div.className = "marker-control hidden";
      div.appendChild(konbBtn);
      div.appendChild(repairBtn);
      div.appendChild(parkingBtn);

      return div;
    },
    createButton: function (label, cluster) {
      const btn = L.DomUtil.create("button");
      
      this.addClusterLayer(cluster);
      btn.textContent = label;
      btn.classList.add("checked");

      btn.onclick = () => {
        if (btn.classList.contains("unchecked")) {
          this.addClusterLayer(cluster);

          btn.classList.remove("unchecked");
          btn.classList.add("checked");
        } else {
          this.removeClusterLayer(cluster);

          btn.classList.remove("checked");
          btn.classList.add("unchecked");
        }
      };
      return btn;
    },
    addClusterLayer: function (cluster) {
      masterMarkerCluster.addLayer(cluster);
      map.addLayer(masterMarkerCluster);
    },
    removeClusterLayer: function (cluster) {
      masterMarkerCluster.removeLayer(cluster);
      map.addLayer(masterMarkerCluster);
    },
  });
  map.addControl(new markerControl());


  // Log category statistics
  console.log('Category Statistics:', DataAccess.getCategoryStats());
}
