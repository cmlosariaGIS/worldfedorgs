
function showSlideOutPanel(item) {
    slideOutPanel.innerHTML = `
        <div class="panel-content">
            <button class="close-panel">&times;</button>
            <br>
            <h2>${item["Name of Organization"]}</h2>
            <p class="location">
                <span class="material-symbols-outlined">location_on</span>
                <strong>${item.City}${item['State/Territory'] ? `, ${item['State/Territory']}` : ''}, ${item.Country}</strong>
            </p>

            <br>
            <div class="info-row">
                <p>
                    <span class="material-symbols-outlined">date_range</span>
                    <strong>Year Founded:</strong> ${item["Year Founded"]}
                </p>
                <a href="${item.Website}" target="_blank" class="website-button">
                    <span class="material-icons">language</span>
                    Website
                </a>
            </div>
            <p class="members">
                <span class="material-symbols-outlined">groups</span>
                <strong>Total Members:</strong> ${item["Total Members"]}
            </p>
            <h3 class="about-us-header">
                <span class="material-symbols-outlined">info</span>
                About Us
            </h3>
            <p class="about-us">${item["About Us"]}</p>
            <br>
            <br>
            <p class="location-note">*pinned location is indicative only</p>
        </div>
    `;
    slideOutPanel.classList.add('active');

    // Add event listener to close button
    const closeButton = slideOutPanel.querySelector('.close-panel');
    closeButton.addEventListener('click', () => {
        slideOutPanel.classList.remove('active');
    });
}

// Close panel when clicking outside
map.on('click', () => {
    slideOutPanel.classList.remove('active');
});