// temporal.js
(function() {
    let yearSlider, playButton, currentYearDisplay, speedControls, resetButton;
    let animation;
    let availableYears;
    let currentSpeed = 1;
    let isLooping = false;

    function initTemporalControls() {
        // Get unique, sorted years from the data
        availableYears = [...new Set(data.map(item => item["Year Founded"]))].sort((a, b) => a - b);

        const minYear = availableYears[0];
        const maxYear = availableYears[availableYears.length - 1];

        const controlsContainer = document.createElement('div');
        controlsContainer.id = 'yearControls';

        const controlsRow = document.createElement('div');
        controlsRow.className = 'controls-row';

        yearSlider = document.createElement('input');
        yearSlider.type = 'range';
        yearSlider.min = 0;
        yearSlider.max = availableYears.length - 1;
        yearSlider.value = availableYears.length - 1; // Set initial value to max
        yearSlider.step = 1;
        yearSlider.id = 'yearSlider';

        playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.id = 'playButton';

        resetButton = document.createElement('button');
        resetButton.innerHTML = '<span class="material-symbols-outlined">restart_alt</span>';
        resetButton.id = 'resetButton';

        currentYearDisplay = document.createElement('span');
        currentYearDisplay.id = 'currentYear';
        currentYearDisplay.textContent = maxYear; // Set initial display to max year

        controlsRow.appendChild(yearSlider);
        controlsRow.appendChild(playButton);
        controlsRow.appendChild(resetButton);
        controlsRow.appendChild(currentYearDisplay);

        speedControls = document.createElement('div');
        speedControls.id = 'speedControls';
        ['0.25x', '0.5x', '1x', '1.5x', '2x'].forEach(speed => {
            const button = document.createElement('button');
            button.textContent = speed;
            button.addEventListener('click', () => setSpeed(speed));
            if (speed === '1x') button.classList.add('active');
            speedControls.appendChild(button);
        });

        controlsContainer.appendChild(controlsRow);
        controlsContainer.appendChild(speedControls);

        document.body.appendChild(controlsContainer);

        yearSlider.addEventListener('input', () => {
            const selectedYear = availableYears[parseInt(yearSlider.value)];
            updateMarkers(selectedYear);
            window.updateStats(selectedYear);
        });

        playButton.addEventListener('click', togglePlay);
        resetButton.addEventListener('click', resetPlayer);

        // Initialize map with all markers
        updateMarkers(maxYear);
        window.updateStats(maxYear);
    }

    function setSpeed(speed) {
        currentSpeed = parseFloat(speed);
        if (animation) {
            clearInterval(animation);
            startAnimation();
        }
        
        speedControls.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === speed) {
                btn.classList.add('active');
            }
        });
    }

    function togglePlay() {
        if (animation) {
            clearInterval(animation);
            animation = null;
            playButton.textContent = 'Play';
            isLooping = false;
        } else {
            playButton.textContent = 'Pause';
            isLooping = true;
            startAnimation();
        }
    }

    function startAnimation() {
        animation = setInterval(() => {
            let currentIndex = parseInt(yearSlider.value);
            currentIndex++;

            if (currentIndex >= availableYears.length) {
                if (isLooping) {
                    currentIndex = 0; // Loop back to the beginning
                } else {
                    clearInterval(animation);
                    animation = null;
                    playButton.textContent = 'Play';
                    return;
                }
            }

            yearSlider.value = currentIndex;
            const selectedYear = availableYears[currentIndex];
            updateMarkers(selectedYear);
            window.updateStats(selectedYear);
        }, 1000 / currentSpeed);
    }

    function updateMarkers(selectedYear) {
        window.mapFunctions.addMarkers(selectedYear);
        currentYearDisplay.textContent = selectedYear;
    }

    function resetPlayer() {
        if (animation) {
            clearInterval(animation);
            animation = null;
            playButton.textContent = 'Play';
        }
        yearSlider.value = yearSlider.max; // Set to maximum value
        currentSpeed = 1;
        setSpeed('1x');
        isLooping = false;
        const maxYear = availableYears[availableYears.length - 1];
        updateMarkers(maxYear);
        window.updateStats(maxYear);
    }

    // Export the initTemporalControls function to be called from map.js
    window.initTemporalControls = initTemporalControls;
})();