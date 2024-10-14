
// Create the reset button element
const resetButton = document.createElement('button');
resetButton.classList.add('reset-button');
resetButton.innerHTML = `
    <span class="material-symbols-outlined">restart_alt</span>
    Reset
`;

// Add event listener to reset button
resetButton.addEventListener('click', () => {
    slideOutPanel.classList.remove('active');
    map.setView([0, 0], 2); // Adjust the coordinates and zoom level to your desired initial extent
});

// Add the reset button to the document body or any other desired container
document.body.appendChild(resetButton);