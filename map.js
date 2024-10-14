// map.js
let map, markers, gpsIcon, slideOutPanel;
let selectedMarker = null;

function initMap() {
    // Create map
    map = L.map('map').setView([0, 0], 2);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create a marker cluster group
    markers = L.markerClusterGroup();

    // Create custom GPS icon
    gpsIcon = L.icon({
        iconUrl: 'icons8-gps-90.png',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });

    // Initialize slide-out panel
    slideOutPanel = document.getElementById('slide-out-panel');

    // Add markers for each location
    addMarkers();

    // Add the marker cluster group to the map
    map.addLayer(markers);

     // Initialize stats after the map is created
     //initStats();

     // Initialize slide-out panel
     slideOutPanel = document.getElementById('slide-out-panel');
 
     // Initialize temporal controls
     if (typeof window.initTemporalControls === 'function') {
         window.initTemporalControls();
     } else {
         console.error('initTemporalControls is not defined');
     }
 }

function addMarkers(selectedYear = null) {
    markers.clearLayers();
    let bounds = L.latLngBounds();
    data.forEach((item) => {
        if (!selectedYear || item["Year Founded"] <= selectedYear) {
            const marker = L.marker([item.Latitude, item.Longitude], { icon: gpsIcon })
                .on('click', function() {
                    if (selectedMarker) {
                        selectedMarker.setIcon(gpsIcon);
                    }
                    selectedMarker = this;
                    this.setIcon(L.icon({
                        iconUrl: 'icons8-gps-90.png',
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                        popupAnchor: [0, -30],
                        className: 'selected-marker'
                    }));
                    showSlideOutPanel(item);
                });
            markers.addLayer(marker);
            bounds.extend([item.Latitude, item.Longitude]);
        }
    });
    return bounds;
}

function updateMapView(bounds) {
    if (!bounds.isValid()) {
        map.setView([0, 0], 2);
    } else {
        map.fitBounds(bounds);
    }
}

// Initialize map when the page loads
window.onload = initMap;

// Export functions to be used in temporal.js
window.mapFunctions = {
    addMarkers: addMarkers,
    updateMapView: updateMapView
};