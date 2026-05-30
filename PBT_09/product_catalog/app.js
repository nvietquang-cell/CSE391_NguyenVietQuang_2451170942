// PRODUCT CATALOG - INTERACTIVE DOM MANIPULATION

// ============================================
// PRODUCT DATA
// ============================================

const productsData = [
    { id: 1, name: "iPhone 16 Pro", price: 25990000, category: "phone", image: "https://placehold.co/280x200/667eea/ffffff?text=iPhone+16", rating: 4.8, inStock: true, description: "Điện thoại flagship mới nhất từ Apple với chip A18 Pro siêu mạnh mẽ" },
    { id: 2, name: "iPhone 16", price: 20990000, category: "phone", image: "https://placehold.co/280x200/667eea/ffffff?text=iPhone+16", rating: 4.6, inStock: true, description: "Phiên bản tiêu chuẩn của iPhone 16 với hiệu năng tuyệt vời" },
    { id: 3, name: "Samsung Galaxy S24", price: 22990000, category: "phone", image: "https://placehold.co/280x200/667eea/ffffff?text=Galaxy+S24", rating: 4.7, inStock: true, description: "Flagship Android với camera AI tích hợp tuyệt vời" },
    { id: 4, name: "Xiaomi 14 Ultra", price: 18990000, category: "phone", image: "https://placehold.co/280x200/667eea/ffffff?text=Xiaomi+14", rating: 4.5, inStock: true, description: "Điện thoại cao cấp với camera Leica" },
    { id: 5, name: "MacBook Pro 16\"", price: 54990000, category: "laptop", image: "https://placehold.co/280x200/764ba2/ffffff?text=MacBook+Pro", rating: 4.9, inStock: true, description: "Laptop siêu mạnh cho chuyên gia với M4 Max" },
    { id: 6, name: "MacBook Air M3", price: 29990000, category: "laptop", image: "https://placehold.co/280x200/764ba2/ffffff?text=MacBook+Air", rating: 4.8, inStock: true, description: "Laptop siêu nhẹ, nhưng vẫn rất mạnh mẽ" },
    { id: 7, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/280x200/764ba2/ffffff?text=Dell+XPS", rating: 4.6, inStock: true, description: "Laptop Windows cao cấp với RTX 4060" },
    { id: 8, name: "ASUS ROG Zephyrus", price: 42990000, category: "laptop", image: "https://placehold.co/280x200/764ba2/ffffff?text=ASUS+ROG", rating: 4.7, inStock: false, description: "Laptop gaming hàng đầu với RTX 4090" },
    { id: 9, name: "iPad Pro 12.9\"", price: 24990000, category: "tablet", image: "https://placehold.co/280x200/ff6b6b/ffffff?text=iPad+Pro", rating: 4.8, inStock: true, description: "Máy tính bảng premium từ Apple với M4" },
    { id: 10, name: "iPad Air", price: 15990000, category: "tablet", image: "https://placehold.co/280x200/ff6b6b/ffffff?text=iPad+Air", rating: 4.5, inStock: true, description: "Tablet Android tuyệt vời với chip M2" },
    { id: 11, name: "Samsung Galaxy Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/280x200/ff6b6b/ffffff?text=Galaxy+Tab", rating: 4.6, inStock: true, description: "Tablet Android flagship với màn hình AMOLED" },
    { id: 12, name: "Sony WH-1000XM5", price: 7990000, category: "accessory", image: "https://placehold.co/280x200/51cf66/ffffff?text=Sony+Headphones", rating: 4.9, inStock: true, description: "Tai nghe chống ồn tốt nhất hiện nay" },
    { id: 13, name: "Apple AirPods Max", price: 7490000, category: "accessory", image: "https://placehold.co/280x200/51cf66/ffffff?text=AirPods+Max", rating: 4.7, inStock: true, description: "Tai nghe không dây cao cấp từ Apple" },
    { id: 14, name: "Samsung Galaxy Watch", price: 6990000, category: "accessory", image: "https://placehold.co/280x200/51cf66/ffffff?text=Galaxy+Watch", rating: 4.6, inStock: true, description: "Đồng hồ thông minh chạy Wear OS" },
    { id: 15, name: "Magic Keyboard", price: 2990000, category: "accessory", image: "https://placehold.co/280x200/51cf66/ffffff?text=Magic+Keyboard", rating: 4.8, inStock: true, description: "Bàn phím không dây từ Apple" },
];

// ============================================
// DOM ELEMENTS
// ============================================

const searchInput = document.querySelector("#searchInput");
const categoryBtns = document.querySelectorAll(".category-btn");
const sortSelect = document.querySelector("#sortSelect");
const productsGrid = document.querySelector("#productsGrid");
const noResults = document.querySelector("#noResults");
const resultTitle = document.querySelector("#resultTitle");
const resultCount = document.querySelector("#resultCount");
const darkModeToggle = document.querySelector("#darkModeToggle");
const cartBadge = document.querySelector("#cartBadge");
const productModal = document.querySelector("#productModal");
const modalOverlay = document.querySelector("#modalOverlay");
const closeModal = document.querySelector("#closeModal");
const modalBody = document.querySelector("#modalBody");

// ============================================
// STATE
// ============================================

let cart = [];
let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";

// ============================================
// INITIALIZE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    loadDarkMode();
    setupEventListeners();
    renderProducts();
});

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Search input - Real-time filter
    searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderProducts();
    });

    // Category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            categoryBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            currentCategory = e.target.dataset.category;
            renderProducts();
        });
    });

    // Sort dropdown
    sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    // Dark mode toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        updateDarkModeButton();
    });

    // Modal close
    closeModal.addEventListener("click", closeProductModal);
    modalOverlay.addEventListener("click", closeProductModal);

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !productModal.classList.contains("hidden")) {
            closeProductModal();
        }
    });
}

// ============================================
// FILTER & SEARCH & SORT
// ============================================

function getFilteredProducts() {
    let filtered = productsData;

    // Filter by category
    if (currentCategory !== "all") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Filter by search
    if (currentSearch) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(currentSearch) ||
            p.description.toLowerCase().includes(currentSearch)
        );
    }

    // Sort
    filtered = sortProducts(filtered);

    return filtered;
}

function sortProducts(products) {
    const sorted = [...products];

    switch (currentSort) {
        case "price-asc":
            return sorted.sort((a, b) => a.price - b.price);
        case "price-desc":
            return sorted.sort((a, b) => b.price - a.price);
        case "name-asc":
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case "rating-desc":
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
}

// ============================================
// RENDER PRODUCTS
// ============================================

function renderProducts() {
    const filtered = getFilteredProducts();

    // Clear grid
    productsGrid.innerHTML = "";

    // Update result title and count
    const categoryName = getCategoryName(currentCategory);
    resultTitle.textContent = currentSearch ? `Kết quả tìm kiếm: "${currentSearch}"` : categoryName;
    resultCount.textContent = `Hiển thị ${filtered.length} sản phẩm`;

    // Render products using createElement (NOT innerHTML)
    filtered.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });

    // Show/hide no results
    noResults.style.display = filtered.length === 0 ? "block" : "none";
}

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";

    // Image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "product-image";
    card.appendChild(img);

    // Info section
    const info = document.createElement("div");
    info.className = "product-info";

    // Category badge
    const categoryBadge = document.createElement("span");
    categoryBadge.className = "product-category";
    categoryBadge.textContent = getCategoryName(product.category);
    info.appendChild(categoryBadge);

    // Product name
    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;
    info.appendChild(name);

    // Rating
    const ratingDiv = document.createElement("div");
    ratingDiv.className = "product-rating";
    const stars = document.createElement("span");
    stars.className = "stars";
    stars.textContent = "⭐ ".repeat(Math.floor(product.rating)) + (product.rating % 1 > 0 ? "⭐" : "");
    ratingDiv.appendChild(stars);
    const ratingText = document.createElement("span");
    ratingText.className = "rating-text";
    ratingText.textContent = `(${product.rating})`;
    ratingDiv.appendChild(ratingText);
    info.appendChild(ratingDiv);

    // Price
    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);
    info.appendChild(price);

    // Stock status
    const stock = document.createElement("div");
    stock.className = `product-stock ${product.inStock ? "in-stock" : "out-of-stock"}`;
    stock.textContent = product.inStock ? "✅ Còn hàng" : "❌ Hết hàng";
    info.appendChild(stock);

    // Buttons
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    const detailBtn = document.createElement("button");
    detailBtn.className = "btn-secondary";
    detailBtn.textContent = "Chi tiết";
    detailBtn.addEventListener("click", () => openProductModal(product));
    btnGroup.appendChild(detailBtn);

    const cartBtn = document.createElement("button");
    cartBtn.className = "btn-primary";
    cartBtn.textContent = "🛒 Thêm";
    cartBtn.disabled = !product.inStock;
    cartBtn.addEventListener("click", () => addToCart(product));
    btnGroup.appendChild(cartBtn);

    info.appendChild(btnGroup);
    card.appendChild(info);

    return card;
}

// ============================================
// MODAL
// ============================================

function openProductModal(product) {
    modalBody.innerHTML = "";

    const container = document.createElement("div");
    container.className = "modal-product";

    // Image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "modal-image";
    container.appendChild(img);

    // Details
    const details = document.createElement("div");
    details.className = "modal-details";

    const category = document.createElement("div");
    category.className = "modal-category";
    category.textContent = getCategoryName(product.category);
    details.appendChild(category);

    const name = document.createElement("h2");
    name.textContent = product.name;
    details.appendChild(name);

    const rating = document.createElement("div");
    rating.className = "modal-rating";
    const stars = document.createElement("span");
    stars.className = "stars";
    stars.textContent = "⭐ ".repeat(Math.floor(product.rating)) + (product.rating % 1 > 0 ? "⭐" : "");
    rating.appendChild(stars);
    const ratingText = document.createElement("span");
    ratingText.textContent = `${product.rating} sao`;
    rating.appendChild(ratingText);
    details.appendChild(rating);

    const price = document.createElement("div");
    price.className = "modal-price";
    price.textContent = formatPrice(product.price);
    details.appendChild(price);

    const description = document.createElement("p");
    description.className = "modal-description";
    description.textContent = product.description;
    details.appendChild(description);

    const stock = document.createElement("div");
    stock.className = `modal-stock ${product.inStock ? "in-stock" : "out-of-stock"}`;
    stock.textContent = product.inStock ? "✅ Còn hàng - Giao hàng từ 1-3 ngày" : "❌ Hết hàng - Sẽ nhập thêm sớm";
    details.appendChild(stock);

    const actions = document.createElement("div");
    actions.className = "modal-actions";

    const addBtn = document.createElement("button");
    addBtn.className = "btn-add-cart";
    addBtn.textContent = "🛒 Thêm vào giỏ";
    addBtn.disabled = !product.inStock;
    addBtn.addEventListener("click", () => {
        addToCart(product);
        closeProductModal();
    });
    actions.appendChild(addBtn);

    const closeBtn = document.createElement("button");
    closeBtn.className = "btn-close-modal";
    closeBtn.textContent = "Đóng";
    closeBtn.addEventListener("click", closeProductModal);
    actions.appendChild(closeBtn);

    details.appendChild(actions);
    container.appendChild(details);

    modalBody.appendChild(container);
    productModal.classList.remove("hidden");
}

function closeProductModal() {
    productModal.classList.add("hidden");
}

// ============================================
// CART
// ============================================

function addToCart(product) {
    cart.push(product);
    updateCartBadge();
    showNotification(`✅ Đã thêm "${product.name}" vào giỏ`);
}

function updateCartBadge() {
    cartBadge.textContent = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function showNotification(message) {
    // Simple notification (can be improved with toast)
    const originalTitle = document.title;
    document.title = message;
    setTimeout(() => {
        document.title = originalTitle;
    }, 2000);
}

// ============================================
// DARK MODE
// ============================================

function loadDarkMode() {
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
        document.body.classList.add("dark-mode");
    }
    updateDarkModeButton();
}

function updateDarkModeButton() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// ============================================
// UTILITIES
// ============================================

function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    }).format(price);
}

function getCategoryName(category) {
    const categoryNames = {
        all: "Tất cả sản phẩm",
        phone: "📱 Điện thoại",
        laptop: "💻 Laptop",
        tablet: "📱 Tablet",
        accessory: "🎧 Phụ kiện"
    };
    return categoryNames[category] || category;
}
