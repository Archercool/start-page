const searchEngines = {
    google: {
        url: 'https://www.google.com/search?q=',
        name: 'Google'
    },
    baidu: {
        url: 'https://www.baidu.com/s?wd=',
        name: '百度'
    },
    bing: {
        url: 'https://www.bing.com/search?q=',
        name: 'Bing'
    }
};

const engineSelect = document.getElementById('engine-select');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const bgVideo = document.getElementById('bg-video');

function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    
    const engine = engineSelect.value;
    const searchUrl = searchEngines[engine].url + encodeURIComponent(query);
    window.open(searchUrl, '_blank');
}

searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

engineSelect.addEventListener('change', () => {
    localStorage.setItem('selectedEngine', engineSelect.value);
});

const savedEngine = localStorage.getItem('selectedEngine');
if (savedEngine && searchEngines[savedEngine]) {
    engineSelect.value = savedEngine;
}

bgVideo.addEventListener('error', () => {
    console.log('视频加载失败，使用备用背景');
    document.querySelector('.video-container').style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
});

const shortcuts = document.querySelectorAll('.shortcut-item');
shortcuts.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-8px) scale(1.05)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });
});
