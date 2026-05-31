const widgets = [
  { el: document.querySelector('#w1 .body'), name: 'Users' },
  { el: document.querySelector('#w2 .body'), name: 'Posts' },
  { el: document.querySelector('#w3 .body'), name: 'Dogs' }
];

const timeEl = document.getElementById('time');
const refreshBtn = document.getElementById('refresh');

function setLoading(widget) {
  widget.el.innerHTML = '<div class="loading">⏳</div>';
}

function setError(widget, error) {
  widget.el.innerHTML = `<div class="error">⚠️ Error: ${error.message || error}</div>`;
}

async function loadDashboard() {
  const start = Date.now();
  refreshBtn.disabled = true;
  
  widgets.forEach(setLoading);
  
  const promises = [
    fetch('https://randomuser.me/api/?results=3')
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))),
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))),
    fetch('https://dog.ceo/api/breeds/image/random/3')
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
  ];
  
  const results = await Promise.allSettled(promises);
  
  results.forEach((res, idx) => {
    const widget = widgets[idx];
    
    if (res.status === 'fulfilled') {
      if (idx === 0) {
        // Users
        const html = res.value.results
          .map(u => `<div class="user-item">👤 ${u.name.first} ${u.name.last}</div>`)
          .join('');
        widget.el.innerHTML = html;
      } else if (idx === 1) {
        // Posts
        const html = res.value
          .map(p => `<div class="post-item"><strong>${p.title}</strong></div>`)
          .join('');
        widget.el.innerHTML = html;
      } else if (idx === 2) {
        // Dogs
        const html = `<div class="dog-images">${res.value.message
          .map(url => `<img src="${url}" alt="dog" loading="lazy" />`)
          .join('')}</div>`;
        widget.el.innerHTML = html;
      }
    } else {
      setError(widget, res.reason);
    }
  });
  
  const duration = Date.now() - start;
  timeEl.textContent = `✓ Loaded in ${duration}ms`;
  refreshBtn.disabled = false;
}

refreshBtn.addEventListener('click', loadDashboard);
loadDashboard();
