// Bài B1 - Quản lý Sản phẩm E-Commerce

const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

// 1. Lọc sản phẩm còn hàng (stock > 0)
function getInStock(products) {
    return products.filter(p => p.stock > 0);
}

// 2. Lọc theo category VÀ khoảng giá
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(p =>
        p.category === category &&
        p.price >= minPrice &&
        p.price <= maxPrice
    );
}

// 3. Sắp xếp theo giá (tăng/giảm)
function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
    );
}

// 4. Tìm sản phẩm rẻ nhất mỗi category
function cheapestByCategory(products) {
    const categories = [...new Set(products.map(p => p.category))];
    const result = {};
    
    categories.forEach(cat => {
        result[cat] = products
            .filter(p => p.category === cat)
            .reduce((cheapest, p) => p.price < cheapest.price ? p : cheapest);
    });
    
    return result;
}

// 5. Tính tổng giá trị kho (price × stock cho mỗi SP)
function totalInventoryValue(products) {
    return products.reduce((total, p) => total + (p.price * p.stock), 0);
}

// 6. Tạo mảng chỉ chứa { name, formattedPrice }
function formatProductList(products) {
    return products.map(p => ({
        name: p.name,
        formattedPrice: p.price.toLocaleString('vi-VN') + 'đ'
    }));
}

// 7. Tính rating trung bình toàn bộ
function averageRating(products) {
    return products.reduce((sum, p) => sum + p.rating, 0) / products.length;
}

// 8. Tìm sản phẩm theo keyword (tìm trong name, case-insensitive)
function searchProducts(products, keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowerKeyword)
    );
}

// ========== TEST ==========

console.log("=== IN-STOCK PRODUCTS ===");
const inStock = getInStock(products);
console.log(`Tổng ${inStock.length} sản phẩm còn hàng:`);
inStock.forEach(p => {
    console.log(`  ${p.name}: ${p.stock} cái`);
});

console.log("\n=== PHONES 15-25 TRIỆU ===");
const phoneFilter = filterProducts(products, "phone", 15000000, 25000000);
phoneFilter.forEach(p => {
    console.log(`  ${p.name}: ${p.price.toLocaleString('vi-VN')}đ (${p.stock} stock)`);
});

console.log("\n=== CHEAPEST BY CATEGORY ===");
const cheapest = cheapestByCategory(products);
Object.entries(cheapest).forEach(([cat, product]) => {
    console.log(`  ${cat}: ${product.name} - ${product.price.toLocaleString('vi-VN')}đ`);
});

console.log("\n=== SORT BY PRICE (ASC) ===");
const sortedAsc = sortByPrice(products, "asc");
console.log("Rẻ nhất đầu tiên:");
sortedAsc.slice(0, 5).forEach(p => {
    console.log(`  ${p.name}: ${p.price.toLocaleString('vi-VN')}đ`);
});

console.log("\n=== SORT BY PRICE (DESC) ===");
const sortedDesc = sortByPrice(products, "desc");
console.log("Đắt nhất đầu tiên:");
sortedDesc.slice(0, 5).forEach(p => {
    console.log(`  ${p.name}: ${p.price.toLocaleString('vi-VN')}đ`);
});

console.log("\n=== TOTAL INVENTORY VALUE ===");
const totalValue = totalInventoryValue(products);
console.log(`Tổng giá trị kho: ${totalValue.toLocaleString('vi-VN')}đ`);

console.log("\n=== FORMAT PRODUCT LIST ===");
const formatted = formatProductList(products.slice(0, 3));
formatted.forEach(p => {
    console.log(`  ${p.name}: ${p.formattedPrice}`);
});

console.log("\n=== AVERAGE RATING ===");
const avgRating = averageRating(products);
console.log(`Đánh giá trung bình: ${avgRating.toFixed(2)} ⭐`);

console.log("\n=== SEARCH BY KEYWORD ===");
const searchResults = searchProducts(products, "Pro");
console.log(`Tìm "Pro": tìm thấy ${searchResults.length} sản phẩm`);
searchResults.forEach(p => {
    console.log(`  ${p.name}: ${p.price.toLocaleString('vi-VN')}đ`);
});

console.log("\n=== SEARCH ANOTHER KEYWORD ===");
const searchMac = searchProducts(products, "Mac");
console.log(`Tìm "Mac": tìm thấy ${searchMac.length} sản phẩm`);
searchMac.forEach(p => {
    console.log(`  ${p.name}: ${p.price.toLocaleString('vi-VN')}đ`);
});
