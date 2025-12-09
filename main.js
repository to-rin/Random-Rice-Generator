import './style.css';
import riceData from './rice.json';

console.log('Rice data loaded:', riceData.length, 'items');

function randomRice() {
    if (!riceData || riceData.length === 0) {
        console.warn('Rice data not available');
        return;
    }

    const btn = document.getElementById('generate-btn');
    const originalText = btn.innerHTML;

    // Loading state
    btn.innerHTML = '<span class="btn-text">Picking...</span>';
    btn.disabled = true;

    // Simulate a brief "thinking" time for effect
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * riceData.length);
        const selectedRice = riceData[randomIndex];

        displayResult(selectedRice);

        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 400);
}

function displayResult(rice) {
    // Hide placeholder, show result
    document.getElementById('placeholder').classList.add('hidden');
    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.remove('hidden');

    // Reset animation to play it again
    resultContainer.style.animation = 'none';
    resultContainer.offsetHeight; /* trigger reflow */
    resultContainer.style.animation = 'fadeIn 0.5s ease-out';

    // Update text content
    document.getElementById('result-name').textContent = rice.name;
    document.getElementById('description').textContent = rice.description;

    // Update badges
    document.getElementById('category').textContent = rice.category;

    const regionEl = document.getElementById('region');
    if (rice.region) {
        regionEl.textContent = rice.region;
        regionEl.classList.remove('hidden');
    } else {
        regionEl.classList.add('hidden');
    }

    // Update Search Links
    const googleLink = document.getElementById('google-link');
    const bingLink = document.getElementById('bing-link');

    if (googleLink) {
        googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(rice.name + " 食べられる店")}`;
    }
    if (bingLink) {
        bingLink.href = `https://www.bing.com/search?q=${encodeURIComponent(rice.name + " 食べられる店")}`;
    }

    // Update Map
    const mapContainer = document.getElementById('map-container');
    mapContainer.classList.remove('hidden');

    // Reset map animation
    mapContainer.style.animation = 'none';
    mapContainer.offsetHeight; /* trigger reflow */
    mapContainer.style.animation = 'slideUp 0.6s ease-out';

    const mapFrame = document.getElementById('map-frame');

    // Construct the Google Maps search URL
    // Use the legacy embed format to avoid "refused to connect" / X-Frame-Options errors
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(rice.name)}&output=embed`;
    mapFrame.src = mapUrl;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('generate-btn');
    if (btn) {
        btn.addEventListener('click', randomRice);
    }
});
