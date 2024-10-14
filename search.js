// search.js

const searchInput = document.getElementById('legislatorSearch');
const searchResults = document.getElementById('searchResults');

function createSearchResult(item) {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = item["Name of Organization"];
    resultItem.appendChild(nameSpan);
    
    const countrySpan = document.createElement('span');
    countrySpan.textContent = item["Country"];
    countrySpan.className = 'country-name';
    resultItem.appendChild(countrySpan);

    resultItem.addEventListener('click', () => {
        // Zoom to the selected location and show the slide-out panel
        const zoomLevel = 7;
        map.setView([item.Latitude, item.Longitude], zoomLevel);
        showSlideOutPanel(item);
        
        // Clear search input and hide search results
        searchInput.value = '';
        searchResults.style.display = 'none';
    });
    return resultItem;
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';

    results.forEach(item => {
        const resultItem = createSearchResult(item);
        searchResults.appendChild(resultItem);
    });

    if (searchResults.children.length > 0) {
        searchResults.style.display = 'block';
    } else {
        searchResults.style.display = 'none';
    }
}

function searchLocations() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredResults = data.filter(item =>
        item["Name of Organization"].toLowerCase().includes(searchTerm) ||
        item["City"].toLowerCase().includes(searchTerm) ||
        item["State/Territory"].toLowerCase().includes(searchTerm) ||
        item["Country"].toLowerCase().includes(searchTerm) ||
        item["Region"].toLowerCase().includes(searchTerm)
    );
    displaySearchResults(filteredResults);
}

searchInput.addEventListener('input', searchLocations);

document.addEventListener('click', event => {
    if (!searchInput.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});