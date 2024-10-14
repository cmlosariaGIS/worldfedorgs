// dropdown.js
// Get unique countries from data
const countries = [...new Set(data.map(item => item.Country))];

// Function to calculate appropriate zoom level
function getZoomLevel(bounds) {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 4;

    function latRad(lat) {
        const sin = Math.sin(lat * Math.PI / 180);
        const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;
    const lngDiff = ne.lng - sw.lng;
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    const latZoom = zoom(map.getSize().y, WORLD_DIM.height, latFraction);
    const lngZoom = zoom(map.getSize().x, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

// Create custom control for country dropdown
L.Control.CountrySelect = L.Control.extend({
    onAdd: function (map) {
        const select = L.DomUtil.create('select', 'country-select');
        select.innerHTML = '<option value="">Select a country</option>' +
            countries.map(country => `<option value="${country}">${country}</option>`).join('');

        L.DomEvent.on(select, 'change', function () {
            const selectedCountry = this.value;
            const bounds = addMarkers(selectedCountry);
            if (selectedCountry) {
                const zoom = getZoomLevel(bounds);
                map.flyToBounds(bounds, { padding: [50, 50], duration: 1, maxZoom: zoom });
            } else {
                map.flyTo([0, 0], 2, { duration: 1 });
            }
        });

        return select;
    },
    onRemove: function (map) {
        // Nothing to do here
    }
});

L.control.countrySelect = function (opts) {
    return new L.Control.CountrySelect(opts);
}

// Add country select control to the map
function addCountryDropdown() {
    L.control.countrySelect({ position: 'topright' }).addTo(map);
}

// Initialize dropdown after the map is loaded
window.onload = function () {
    initMap();
    addCountryDropdown();
};


