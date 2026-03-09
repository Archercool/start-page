const searchEngines = {
    google: { url: 'https://www.google.com/search?q=', name: 'Google', icon: '🔍' },
    baidu: { url: 'https://www.baidu.com/s?wd=', name: '百度', icon: '🔎' },
    bing: { url: 'https://www.bing.com/search?q=', name: 'Bing', icon: '🌐' }
};

let currentEngine = localStorage.getItem('selectedEngine') || 'google';

const engineDropdown = document.getElementById('engine-dropdown');
const engineSelected = document.getElementById('engine-selected');
const engineOptions = document.querySelectorAll('.engine-options li');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const bgVideo = document.getElementById('bg-video');

function updateEngineDisplay() {
    const engine = searchEngines[currentEngine];
    engineSelected.innerHTML = `
        <span class="engine-icon">${engine.icon}</span>
        <span class="engine-name">${engine.name}</span>
        <span class="engine-arrow">▼</span>
    `;
    engineOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.value === currentEngine);
    });
}

engineSelected.addEventListener('click', (e) => {
    e.stopPropagation();
    engineDropdown.classList.toggle('open');
});

engineOptions.forEach(option => {
    option.addEventListener('click', () => {
        currentEngine = option.dataset.value;
        localStorage.setItem('selectedEngine', currentEngine);
        updateEngineDisplay();
        engineDropdown.classList.remove('open');
    });
});

document.addEventListener('click', () => {
    engineDropdown.classList.remove('open');
});

function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    const searchUrl = searchEngines[currentEngine].url + encodeURIComponent(query);
    window.open(searchUrl, '_blank');
}

searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

bgVideo.addEventListener('error', () => {
    document.querySelector('.video-container').style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
});

updateEngineDisplay();
