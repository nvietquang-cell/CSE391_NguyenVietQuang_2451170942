const grid = document.getElementById('grid');
const loader = document.getElementById('loader');
const trigger = document.getElementById('load-trigger');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const imageCounter = document.getElementById('image-counter');

let page = 1;
let loading = false;
let allImages = [];
let currentImageIndex = -1;

async function loadPhotos() {
  if (loading) return;
  loading = true;
  loader.classList.remove('hidden');
  
  try {
    const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const items = await res.json();
    items.forEach(it => {
      const img = document.createElement('img');
      img.dataset.src = it.download_url;
      img.alt = it.author;
      img.loading = 'lazy';
      
      // Store image data
      allImages.push({
        src: it.download_url,
        author: it.author,
        element: img
      });
      
      img.addEventListener('click', () => {
        currentImageIndex = allImages.findIndex(i => i.src === it.download_url);
        openLightbox(it.download_url);
      });
      
      grid.appendChild(img);
    });
    
    lazyObserve();
    page++;
  } catch (err) {
    console.error('Error loading photos:', err);
    loader.innerHTML = '<p style="color: #d32f2f;">❌ Error loading images</p>';
  } finally {
    loading = false;
    loader.classList.add('hidden');
  }
}

// Lazy load images
function lazyObserve() {
  const imgs = Array.from(document.querySelectorAll('img[data-src]'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        el.src = el.dataset.src;
        el.removeAttribute('data-src');
        io.unobserve(el);
      }
    });
  }, { rootMargin: '100px' });
  
  imgs.forEach(i => io.observe(i));
}

// Infinite scroll observer
const obs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) loadPhotos();
}, { rootMargin: '200px' });

obs.observe(trigger);

// Lightbox functions
function openLightbox(src) {
  lbImg.src = src;
  lightbox.classList.remove('hidden');
  updateImageCounter();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function updateImageCounter() {
  if (currentImageIndex >= 0) {
    imageCounter.textContent = `${currentImageIndex + 1} / ${allImages.length}`;
  }
}

function showPreviousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    lbImg.src = allImages[currentImageIndex].src;
    updateImageCounter();
  }
}

function showNextImage() {
  if (currentImageIndex < allImages.length - 1) {
    currentImageIndex++;
    lbImg.src = allImages[currentImageIndex].src;
    updateImageCounter();
  }
}

// Event listeners
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPreviousImage);
nextBtn.addEventListener('click', showNextImage);

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('hidden')) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    showPreviousImage();
  } else if (e.key === 'ArrowRight') {
    showNextImage();
  }
});

// Initial load
loadPhotos();
