// KEYBOARD SHORTCUTS & ACCESSIBILITY APP

// ============================================
// GALLERY DATA
// ============================================

const galleryImages = [
    {
        id: 1,
        title: "Mountain Landscape",
        url: "https://placehold.co/800x600/667eea/ffffff?text=Mountain+Landscape",
        description: "A beautiful mountain landscape with snow peaks"
    },
    {
        id: 2,
        title: "Ocean Sunset",
        url: "https://placehold.co/800x600/764ba2/ffffff?text=Ocean+Sunset",
        description: "Golden sunset over the calm ocean waters"
    },
    {
        id: 3,
        title: "Forest Trail",
        url: "https://placehold.co/800x600/51cf66/ffffff?text=Forest+Trail",
        description: "A serene path through the green forest"
    },
    {
        id: 4,
        title: "Urban Skyline",
        url: "https://placehold.co/800x600/4ecdc4/ffffff?text=Urban+Skyline",
        description: "City lights and modern architecture"
    },
    {
        id: 5,
        title: "Desert Dunes",
        url: "https://placehold.co/800x600/ffc107/ffffff?text=Desert+Dunes",
        description: "Golden sand dunes under clear sky"
    },
    {
        id: 6,
        title: "Winter Snow",
        url: "https://placehold.co/800x600/e3f2fd/ffffff?text=Winter+Snow",
        description: "Peaceful snowy landscape"
    },
    {
        id: 7,
        title: "Tropical Beach",
        url: "https://placehold.co/800x600/4db8ff/ffffff?text=Tropical+Beach",
        description: "Pristine sandy beach with turquoise water"
    },
    {
        id: 8,
        title: "Autumn Colors",
        url: "https://placehold.co/800x600/ff9800/ffffff?text=Autumn+Colors",
        description: "Vibrant fall foliage"
    },
    {
        id: 9,
        title: "Northern Lights",
        url: "https://placehold.co/800x600/6200ea/ffffff?text=Northern+Lights",
        description: "Aurora Borealis dancing across the night sky"
    }
];

// ============================================
// COMMAND PALETTE COMMANDS
// ============================================

const commands = [
    { name: "Play/Pause", shortcut: "Space", action: "togglePlay", description: "Bắt đầu/dừng slideshow" },
    { name: "Next Image", shortcut: "→ or Right", action: "nextImage", description: "Ảnh tiếp theo" },
    { name: "Previous Image", shortcut: "← or Left", action: "prevImage", description: "Ảnh trước" },
    { name: "First Image", shortcut: "Home or 1", action: "goToImage", param: 0, description: "Ảnh đầu tiên" },
    { name: "Last Image", shortcut: "End or 9", action: "goToImage", param: 8, description: "Ảnh cuối cùng" },
    { name: "Zoom In", shortcut: "+", action: "zoomIn", description: "Phóng to ảnh" },
    { name: "Zoom Out", shortcut: "-", action: "zoomOut", description: "Thu nhỏ ảnh" },
    { name: "Reset Zoom", shortcut: "R", action: "resetZoom", description: "Đặt lại zoom" },
    { name: "Fullscreen", shortcut: "F", action: "toggleFullscreen", description: "Toàn màn hình" },
    { name: "Open Command Palette", shortcut: "Ctrl+K", action: "openCommandPalette", description: "Lệnh nhanh" },
    { name: "Close", shortcut: "Esc", action: "closeAll", description: "Thoát" }
];

// ============================================
// DOM ELEMENTS
// ============================================

const galleryImage = document.querySelector("#galleryImage");
const imageName = document.querySelector("#imageName");
const imageDesc = document.querySelector("#imageDesc");
const imageCount = document.querySelector("#imageCount");
const slideStatus = document.querySelector("#slideStatus");
const thumbnails = document.querySelector("#thumbnails");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playBtn = document.querySelector("#playBtn");
const zoomInBtn = document.querySelector("#zoomInBtn");
const zoomOutBtn = document.querySelector("#zoomOutBtn");
const commandPaletteBtn = document.querySelector("#commandPaletteBtn");
const fullscreenBtn = document.querySelector("#fullscreenBtn");
const commandPalette = document.querySelector("#commandPalette");
const paletteOverlay = document.querySelector("#paletteOverlay");
const commandSearch = document.querySelector("#commandSearch");
const commandList = document.querySelector("#commandList");
const toast = document.querySelector("#toast");
const imageContainer = document.querySelector("#imageContainer");

// ============================================
// STATE
// ============================================

let currentIndex = 0;
let isPlaying = false;
let slideInterval = null;
let selectedCommandIndex = 0;

// ============================================
// INITIALIZE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    renderThumbnails();
    displayImage(0);
    setupEventListeners();
    setupCommandPalette();
});

// ============================================
// IMAGE DISPLAY
// ============================================

function displayImage(index) {
    if (index < 0 || index >= galleryImages.length) return;

    currentIndex = index;
    const image = galleryImages[index];

    galleryImage.src = image.url;
    galleryImage.alt = image.title;
    imageName.textContent = image.title;
    imageDesc.textContent = image.description;
    imageCount.textContent = `${index + 1}/${galleryImages.length}`;

    // Update active thumbnail
    document.querySelectorAll(".thumbnail").forEach((thumb, i) => {
        thumb.classList.toggle("active", i === index);
    });
}

function nextImage() {
    displayImage((currentIndex + 1) % galleryImages.length);
}

function prevImage() {
    displayImage((currentIndex - 1 + galleryImages.length) % galleryImages.length);
}

function goToImage(index) {
    if (index >= 0 && index < galleryImages.length) {
        displayImage(index);
    }
}

// ============================================
// SLIDESHOW CONTROL
// ============================================

function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayButton();

    if (isPlaying) {
        slideStatus.textContent = "▶️ Đang chạy";
        slideInterval = setInterval(() => {
            nextImage();
        }, 3000);
        showToast("▶️ Slideshow đang chạy");
    } else {
        slideStatus.textContent = "⏸️ Dừng";
        clearInterval(slideInterval);
        showToast("⏸️ Slideshow dừng");
    }
}

function updatePlayButton() {
    playBtn.textContent = isPlaying ? "⏸️ Dừng" : "▶️ Phát";
}

// ============================================
// ZOOM CONTROL
// ============================================

function zoomIn() {
    galleryImage.classList.add("zoomed");
    showToast("🔍 Đã phóng to");
}

function zoomOut() {
    galleryImage.classList.remove("zoomed");
    showToast("🔍 Đã thu nhỏ");
}

function resetZoom() {
    galleryImage.classList.remove("zoomed");
    showToast("↺ Đã đặt lại zoom");
}

// ============================================
// FULLSCREEN
// ============================================

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        imageContainer.requestFullscreen().catch(err => {
            console.log("Fullscreen request failed:", err);
        });
        showToast("🖥️ Toàn màn hình");
    } else {
        document.exitFullscreen();
        showToast("⬜ Thoát toàn màn hình");
    }
}

// ============================================
// COMMAND PALETTE
// ============================================

function setupCommandPalette() {
    renderCommands(commands);
}

function renderCommands(commandsToRender) {
    commandList.innerHTML = "";
    commandsToRender.forEach((cmd, index) => {
        const item = document.createElement("div");
        item.className = "command-item";
        item.role = "option";
        if (index === 0) item.classList.add("selected");

        item.innerHTML = `
            <div class="command-label">
                <div class="command-name">${cmd.name}</div>
                <div class="command-shortcut">${cmd.shortcut}</div>
            </div>
        `;

        item.addEventListener("click", () => {
            executeCommand(cmd);
            closeCommandPalette();
        });

        commandList.appendChild(item);
    });
}

function executeCommand(cmd) {
    switch (cmd.action) {
        case "nextImage":
            nextImage();
            break;
        case "prevImage":
            prevImage();
            break;
        case "togglePlay":
            togglePlay();
            break;
        case "goToImage":
            goToImage(cmd.param);
            break;
        case "zoomIn":
            zoomIn();
            break;
        case "zoomOut":
            zoomOut();
            break;
        case "resetZoom":
            resetZoom();
            break;
        case "toggleFullscreen":
            toggleFullscreen();
            break;
        case "openCommandPalette":
            openCommandPalette();
            break;
        case "closeAll":
            closeAll();
            break;
    }
}

function openCommandPalette() {
    commandPalette.classList.remove("hidden");
    commandSearch.focus();
    selectedCommandIndex = 0;
    updateSelectedCommand();
}

function closeCommandPalette() {
    commandPalette.classList.add("hidden");
    commandSearch.value = "";
}

function updateSelectedCommand() {
    const items = document.querySelectorAll(".command-item");
    items.forEach((item, index) => {
        item.classList.toggle("selected", index === selectedCommandIndex);
    });
    items[selectedCommandIndex]?.scrollIntoView({ block: "nearest" });
}

// ============================================
// THUMBNAILS
// ============================================

function renderThumbnails() {
    thumbnails.innerHTML = "";
    galleryImages.forEach((image, index) => {
        const thumb = document.createElement("div");
        thumb.className = "thumbnail";
        if (index === 0) thumb.classList.add("active");

        const img = document.createElement("img");
        img.src = image.url;
        img.alt = image.title;
        thumb.appendChild(img);

        const number = document.createElement("div");
        number.className = "thumbnail-number";
        number.textContent = index + 1;
        thumb.appendChild(number);

        thumb.addEventListener("click", () => displayImage(index));
        // Keyboard navigation: Number keys 1-9
        thumb.setAttribute("aria-label", `Image ${index + 1}: ${image.title}`);

        thumbnails.appendChild(thumb);
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Button clicks
    prevBtn.addEventListener("click", prevImage);
    nextBtn.addEventListener("click", nextImage);
    playBtn.addEventListener("click", togglePlay);
    zoomInBtn.addEventListener("click", zoomIn);
    zoomOutBtn.addEventListener("click", zoomOut);
    commandPaletteBtn.addEventListener("click", openCommandPalette);
    fullscreenBtn.addEventListener("click", toggleFullscreen);

    // Keyboard events
    document.addEventListener("keydown", handleKeydown);

    // Command palette
    commandSearch.addEventListener("input", handleCommandSearch);
    paletteOverlay.addEventListener("click", closeCommandPalette);
}

// ============================================
// KEYBOARD HANDLING
// ============================================

function handleKeydown(e) {
    // Don't handle if command palette is open and search is focused
    if (!commandPalette.classList.contains("hidden") && document.activeElement === commandSearch) {
        handleCommandPaletteKeydown(e);
        return;
    }

    // Global shortcuts
    switch (e.key) {
        case " ":
            e.preventDefault();
            togglePlay();
            break;
        case "ArrowRight":
            e.preventDefault();
            nextImage();
            break;
        case "ArrowLeft":
            e.preventDefault();
            prevImage();
            break;
        case "Escape":
            e.preventDefault();
            closeAll();
            break;
        case "f":
        case "F":
            if (!commandPalette.classList.contains("hidden")) break;
            e.preventDefault();
            toggleFullscreen();
            break;
        case "k":
        case "K":
            if ((e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                if (!commandPalette.classList.contains("hidden")) {
                    closeCommandPalette();
                } else {
                    openCommandPalette();
                }
            }
            break;
        case "+":
        case "=":
            e.preventDefault();
            zoomIn();
            break;
        case "-":
            e.preventDefault();
            zoomOut();
            break;
        case "r":
        case "R":
            if (!commandPalette.classList.contains("hidden")) break;
            e.preventDefault();
            resetZoom();
            break;
        case "Home":
            e.preventDefault();
            goToImage(0);
            break;
        case "End":
            e.preventDefault();
            goToImage(galleryImages.length - 1);
            break;
        default:
            // Number keys 1-9
            const num = parseInt(e.key);
            if (num >= 1 && num <= 9 && !commandPalette.classList.contains("hidden") === false) {
                e.preventDefault();
                goToImage(num - 1);
            }
    }
}

function handleCommandPaletteKeydown(e) {
    switch (e.key) {
        case "ArrowDown":
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex + 1) % document.querySelectorAll(".command-item").length;
            updateSelectedCommand();
            break;
        case "ArrowUp":
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex - 1 + document.querySelectorAll(".command-item").length) % document.querySelectorAll(".command-item").length;
            updateSelectedCommand();
            break;
        case "Enter":
            e.preventDefault();
            const items = document.querySelectorAll(".command-item");
            const selectedCmd = commands[selectedCommandIndex];
            executeCommand(selectedCmd);
            closeCommandPalette();
            break;
        case "Escape":
            e.preventDefault();
            closeCommandPalette();
            break;
    }
}

function handleCommandSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = commands.filter(cmd =>
        cmd.name.toLowerCase().includes(searchTerm) ||
        cmd.shortcut.toLowerCase().includes(searchTerm) ||
        cmd.description.toLowerCase().includes(searchTerm)
    );
    renderCommands(filtered);
    selectedCommandIndex = 0;
    updateSelectedCommand();
}

// ============================================
// UTILITIES
// ============================================

function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}

function closeAll() {
    if (!commandPalette.classList.contains("hidden")) {
        closeCommandPalette();
    }
    if (isPlaying) {
        togglePlay();
    }
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    resetZoom();
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Announce to screen readers
function announce(message) {
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.textContent = message;
    announcement.style.position = "absolute";
    announcement.style.left = "-10000px";
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Add aria labels to images
galleryImage.setAttribute("aria-label", "Gallery image viewer");
imageName.setAttribute("aria-live", "polite");
imageDesc.setAttribute("aria-live", "polite");

// Keyboard help
document.addEventListener("keydown", (e) => {
    if (e.key === "?") {
        showToast("⌨️ Shortcuts: Arrow keys, Space, Ctrl+K, Esc, 1-9, F=Fullscreen");
    }
});

// Print keyboard shortcuts to console
console.log("🎮 Keyboard Shortcuts Available:");
commands.forEach(cmd => {
    console.log(`  ${cmd.shortcut.padEnd(15)} - ${cmd.description}`);
});
