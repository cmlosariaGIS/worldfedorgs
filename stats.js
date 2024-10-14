// stats.js

let statsContainer;

function calculateStats(currentYear) {
    const relevantData = data.filter(item => item["Year Founded"] <= currentYear);
    const totalOrganizations = relevantData.length;
    const uniqueCountries = new Set(relevantData.map(item => item.Country)).size;

    return {
        organizations: totalOrganizations,
        countries: uniqueCountries
    };
}

function createStatsContainer() {
    statsContainer = L.DomUtil.create('div', 'stats-container');
    updateStatsDisplay(calculateStats(Math.max(...data.map(item => item["Year Founded"]))));

    // Create a custom control for the stats
    L.Control.Stats = L.Control.extend({
        onAdd: function(map) {
            return statsContainer;
        }
    });

    // Add the stats control to the map
    new L.Control.Stats({ position: 'bottomleft' }).addTo(map);
}

function updateStatsDisplay(stats) {
    statsContainer.innerHTML = `
        <div class="stat-item">
            <span class="number">${stats.organizations}</span>
            <span class="label">Federalism Organizations</span>
        </div>
        <div class="stat-item countries">in ${stats.countries} countries</div>
    `;
}

// This function will be called from map.js after the map is initialized
function initStats() {
    createStatsContainer();
}

// This function will be called from temporal.js when the year changes
function updateStats(currentYear) {
    const stats = calculateStats(currentYear);
    updateStatsDisplay(stats);
}

// Export the updateStats function to be called from temporal.js
window.updateStats = updateStats;