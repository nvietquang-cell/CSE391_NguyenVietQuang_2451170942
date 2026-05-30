// Bài B2 - Giỏ hàng (Shopping Cart) - Sử dụng Closure

function createCart() {
    // Private data - chỉ có thể truy cập qua các methods
    let items = [];
    let discount = 0;

    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                // Sản phẩm đã có, tăng quantity
                existingItem.quantity += quantity;
            } else {
                // Thêm sản phẩm mới
                items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            }
        },

        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },

        // Tính tổng tiền
        getTotal() {
            const subtotal = items.reduce((sum, item) => 
                sum + (item.price * item.quantity), 0);
            
            const discountAmount = subtotal * discount;
            return subtotal - discountAmount;
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {
            const discountCodes = {
                "SALE10": 0.10,
                "SALE20": 0.20,
                "FREESHIP": 30000 / this.getSubtotal() // Tương đương giảm 30k
            };

            if (discountCodes[code]) {
                discount = discountCodes[code];
                if (code === "FREESHIP") {
                    // Giảm 30k tối đa
                    const subtotal = items.reduce((sum, item) => 
                        sum + (item.price * item.quantity), 0);
                    discount = Math.min(0.05, 30000 / subtotal); // Xấp xỉ 5% hoặc 30k
                }
                return true;
            }
            return false;
        },

        // Lấy subtotal (trước discount)
        getSubtotal() {
            return items.reduce((sum, item) => 
                sum + (item.price * item.quantity), 0);
        },

        // Lấy số tiền giảm
        getDiscountAmount() {
            return this.getSubtotal() * discount;
        },

        // Lấy discount percent
        getDiscountPercent() {
            return discount;
        },

        // In giỏ hàng dạng bảng
        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng trống!");
                return;
            }

            const WIDTH = 60;
            console.log("┌" + "─".repeat(WIDTH - 2) + "┐");
            console.log("│" + " HÓA ĐƠN MUA HÀNG ".padStart(35).padEnd(WIDTH - 1) + "│");
            console.log("├" + "─".repeat(WIDTH - 2) + "┤");
            
            // Header
            console.log("│ # │ Sản phẩm" + " ".repeat(18) + "│ SL │ Đơn giá   │ Tổng" + " ".repeat(7) + "│");
            console.log("├" + "─".repeat(WIDTH - 2) + "┤");

            // Items
            items.forEach((item, idx) => {
                const itemTotal = item.price * item.quantity;
                const name = item.name.substring(0, 20).padEnd(20);
                const qty = String(item.quantity).padStart(3);
                const unitPrice = item.price.toLocaleString('vi-VN').padStart(10);
                const total = itemTotal.toLocaleString('vi-VN').padStart(12);
                
                console.log(`│ ${idx + 1} │ ${name} │${qty} │${unitPrice} │${total} │`);
            });

            console.log("├" + "─".repeat(WIDTH - 2) + "┤");

            // Subtotal
            const subtotal = this.getSubtotal();
            const subtotalStr = subtotal.toLocaleString('vi-VN').padStart(45);
            console.log(`│ Tổng cộng: ${subtotalStr.substring(0, 45)} │`);

            // Discount
            if (discount > 0) {
                const discountAmount = this.getDiscountAmount();
                const discountStr = (`-${discountAmount.toLocaleString('vi-VN')}`).padStart(45);
                console.log(`│ Giảm (${(discount * 100).toFixed(0)}%): ${discountStr.substring(0, 40)} │`);
            }

            // Total
            const total = this.getTotal();
            const totalStr = total.toLocaleString('vi-VN').padStart(45);
            console.log("├" + "─".repeat(WIDTH - 2) + "┤");
            console.log(`│ THANH TOÁN: ${totalStr.substring(0, 43)} │`);
            console.log("└" + "─".repeat(WIDTH - 2) + "┘");
        },

        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((count, item) => count + item.quantity, 0);
        },

        // Lấy số loại sản phẩm
        getUniqueItemCount() {
            return items.length;
        },

        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discount = 0;
        },

        // Lấy danh sách items (read-only copy)
        getItems() {
            return items.map(item => ({...item}));
        }
    };
}

// ========== TEST ==========

console.log("=== TEST SHOPPING CART ===\n");

const cart = createCart();

// Test 1: Thêm sản phẩm
console.log("--- Test 1: Thêm sản phẩm ---");
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

console.log("Giỏ hàng sau khi thêm:");
cart.printCart();
console.log();

// Test 2: Thông tin giỏ
console.log("--- Test 2: Thông tin giỏ ---");
console.log(`Số loại sản phẩm: ${cart.getUniqueItemCount()}`);
console.log(`Tổng số lượng: ${cart.getItemCount()} cái`);
console.log(`Tổng tiền: ${cart.getSubtotal().toLocaleString('vi-VN')}đ\n`);

// Test 3: Áp dụng discount
console.log("--- Test 3: Áp dụng SALE10 ---");
cart.applyDiscount("SALE10");
cart.printCart();
console.log(`Tiền sau discount: ${cart.getTotal().toLocaleString('vi-VN')}đ\n`);

// Test 4: Xóa sản phẩm
console.log("--- Test 4: Xóa AirPods Pro ---");
cart.removeItem(3);
console.log(`Số lượng sau xóa: ${cart.getItemCount()}`);
console.log(`Tổng tiền: ${cart.getTotal().toLocaleString('vi-VN')}đ\n`);

// Test 5: Clear cart
console.log("--- Test 5: Clear cart ---");
cart.clearCart();
console.log(`Giỏ hàng trống? ${cart.getItemCount() === 0 ? 'Đúng' : 'Sai'}`);
console.log();

// Test 6: Discount codes
console.log("--- Test 6: Các mã giảm giá ---");
const cart2 = createCart();
cart2.addItem({ id: 2, name: "MacBook Pro", price: 45990000 }, 1);
cart2.addItem({ id: 6, name: "Dell XPS 15", price: 35990000 }, 1);

console.log("Giỏ hàng mới:");
cart2.printCart();
console.log();

console.log("Áp dụng SALE20:");
cart2.applyDiscount("SALE20");
cart2.printCart();
console.log();

// Test 7: Update quantity
console.log("--- Test 7: Update quantity ---");
const cart3 = createCart();
cart3.addItem({ id: 5, name: "Samsung S24", price: 22990000 }, 1);
cart3.addItem({ id: 7, name: "Galaxy Buds", price: 3490000 }, 1);

console.log("Giỏ hàng ban đầu:");
cart3.printCart();
console.log();

console.log("Tăng Galaxy Buds lên 3 cái:");
cart3.updateQuantity(7, 3);
cart3.printCart();
console.log();

console.log("Hạ Samsung S24 xuống 0 (xóa):");
cart3.updateQuantity(5, 0);
cart3.printCart();
