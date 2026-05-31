const $ = (s) => document.querySelector(s);
const cityIn = $('#city');
const btn = $('#btn');
const status = $('#status');
const result = $('#result');
const historyEl = $('#history');
const geoBtn = $('#geolocate');
const unitToggle = $('#unit-toggle');

let isCelsius = true;

function showStatus(text, cls = '') {
  status.textContent = text;
  status.className = 'status-message';
  if (cls) status.classList.add(cls);
  status.classList.remove('hidden');
}

function showResult(html) {
  result.innerHTML = html;
  result.classList.remove('hidden');
}

function hideResult() {
  result.classList.add('hidden');
}

function loadHistory() {
  const h = JSON.parse(localStorage.getItem('weather_history') || '[]');
  historyEl.innerHTML = '';
  h.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.addEventListener('click', () => {
      cityIn.value = city;
      fetchWeather(city);
    });
    historyEl.appendChild(li);
  });
}

function pushHistory(city) {
  if (!city) return;
  let h = JSON.parse(localStorage.getItem('weather_history') || '[]');
  h = [city, ...h.filter(c => c !== city)].slice(0, 8);
  localStorage.setItem('weather_history', JSON.stringify(h));
  loadHistory();
}

async function fetchWeather(city) {
  if (!city) {
    showStatus('❌ Please enter a city name', 'error');
    return;
  }
  hideResult();
  showStatus('⏳ Loading weather...', 'loading');
  
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    const c = data.current_condition && data.current_condition[0];
    if (!c) throw new Error('Could not fetch weather data');
    
    let temp = c.temp_C;
    if (!isCelsius) {
      temp = Math.round((c.temp_C * 9/5) + 32);
    }
    
    const html = `
      <h2>📍 ${city}</h2>
      <p><strong>🌡️ Temperature:</strong> ${temp}° ${isCelsius ? 'C' : 'F'}</p>
      <p><strong>💧 Humidity:</strong> ${c.humidity}%</p>
      <p><strong>💨 Wind Speed:</strong> ${c.windspeedKmph} km/h</p>
      <p><strong>🌅 Condition:</strong> ${c.weatherDesc[0].value}</p>
      <img src="${c.weatherIconUrl[0].value}" alt="Weather icon" />
    `;
    
    showResult(html);
    showStatus('✓ Weather loaded successfully', 'success');
    pushHistory(city);
  } catch (err) {
    hideResult();
    showStatus('❌ Error: ' + err.message, 'error');
  }
}

btn.addEventListener('click', () => fetchWeather(cityIn.value.trim()));
cityIn.addEventListener('keyup', e => {
  if (e.key === 'Enter') fetchWeather(cityIn.value.trim());
});

geoBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    showStatus('❌ Geolocation not supported', 'error');
    return;
  }
  
  showStatus('📍 Getting location...', 'loading');
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      // Use reverse geocoding with wttr.in
      fetch(`https://wttr.in/${latitude},${longitude}?format=j1`)
        .then(r => r.json())
        .then(data => {
          const city = data.nearest_area[0].areaName[0].value;
          cityIn.value = city;
          fetchWeather(city);
        })
        .catch(err => showStatus('❌ Error: ' + err.message, 'error'));
    },
    error => {
      showStatus('❌ Location permission denied', 'error');
    }
  );
});

unitToggle.addEventListener('click', () => {
  isCelsius = !isCelsius;
  unitToggle.textContent = isCelsius ? '°C' : '°F';
  unitToggle.classList.toggle('active');
  
  // Refresh current weather if already loaded
  if (!result.classList.contains('hidden')) {
    const cityName = result.querySelector('h2')?.textContent?.replace('📍 ', '') || '';
    if (cityName) {
      fetchWeather(cityName);
    }
  }
});

loadHistory();
