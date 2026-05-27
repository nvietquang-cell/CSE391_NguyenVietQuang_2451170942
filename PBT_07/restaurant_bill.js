// Câu C2 - Hóa đơn nhà hàng

// Dữ liệu: Mảng chứa các món ăn
const orderItems = [
    { name: 'Phở bò', price: 65000, quantity: 2 },
    { name: 'Trà đá', price: 5000, quantity: 3 },
    { name: 'Bún chả', price: 55000, quantity: 1 },
    { name: 'Cơm tấm', price: 45000, quantity: 1 },
    { name: 'Bánh mì', price: 20000, quantity: 2 }
];

function calculateBill(items, dayOfWeek = null, includeTip = true) {
    // Constants
    const VAT_RATE = 0.08;
    const TIP_RATE = 0.05;
    
    // 1. Tính tổng tiền trước giảm giá
    let subtotal = 0;
    const itemDetails = [];
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemDetails.push({
            index: i + 1,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: itemTotal
        });
    }
    
    // 2. Tính tỉ lệ giảm giá
    let discountPercent = 0;
    
    if (subtotal > 1000000) {
        discountPercent = 15;
    } else if (subtotal > 500000) {
        discountPercent = 10;
    }
    
    // 3. Kiểm tra ngày trong tuần (nếu có) - giảm thêm 5%
    let wednesdayDiscount = 0;
    if (dayOfWeek && dayOfWeek.toLowerCase() === 'wednesday') {
        wednesdayDiscount = 5;
    }
    
    // 4. Tính tiền giảm
    const totalDiscountPercent = discountPercent + wednesdayDiscount;
    const discountAmount = subtotal * (totalDiscountPercent / 100);
    const afterDiscount = subtotal - discountAmount;
    
    // 5. Tính VAT
    const vatAmount = afterDiscount * VAT_RATE;
    
    // 6. Tính Tip
    let tipAmount = 0;
    if (includeTip) {
        tipAmount = afterDiscount * TIP_RATE;
    }
    
    // 7. Tính tổng thanh toán
    const totalPayment = afterDiscount + vatAmount + tipAmount;
    
    return {
        items: itemDetails,
        subtotal: subtotal,
        discountPercent: totalDiscountPercent,
        discountAmount: discountAmount,
        afterDiscount: afterDiscount,
        vat: vatAmount,
        tip: tipAmount,
        total: totalPayment
    };
}

function formatCurrency(num) {
    return num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function formatCurrencySimple(num) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(num));
}

function printBill(billData, dayOfWeek = null) {
    const WIDTH = 42;
    
    function line(char = '=') {
        return char.repeat(WIDTH);
    }
    
    function row(left, right) {
        const leftStr = String(left).substring(0, 25);
        const rightStr = String(right).substring(0, 15);
        const space = WIDTH - leftStr.length - rightStr.length - 2;
        return '║ ' + leftStr + ' '.repeat(Math.max(0, space)) + rightStr + ' ║';
    }
    
    console.log('╔' + line() + '╗');
    console.log(row('HÓA ĐƠN NHÀ HÀNG', ''));
    console.log('╠' + line() + '╣');
    
    // In danh sách món ăn
    for (let i = 0; i < billData.items.length; i++) {
        const item = billData.items[i];
        const itemLine = `${item.index}. ${item.name}`;
        const itemPriceStr = `x${item.quantity} @${formatCurrencySimple(item.price)}`;
        const itemTotalStr = `= ${formatCurrencySimple(item.total)}`;
        console.log(`║ ${itemLine.substring(0, 20)}`);
        console.log(`║   ${itemPriceStr.substring(0, 32)} ${itemTotalStr.substring(0, 8)} ║`);
    }
    
    console.log('╠' + line() + '╣');
    console.log(row('Tổng cộng:', formatCurrencySimple(billData.subtotal)));
    console.log(row(`Giảm giá (${billData.discountPercent}%):`, 
                    `-${formatCurrencySimple(billData.discountAmount)}`));
    console.log(row('Sau giảm:', formatCurrencySimple(billData.afterDiscount)));
    console.log(row(`VAT (8%):`, formatCurrencySimple(billData.vat)));
    if (billData.tip > 0) {
        console.log(row(`Tip (5%):`, formatCurrencySimple(billData.tip)));
    }
    console.log('╠' + line() + '╣');
    console.log(row('THANH TOÁN:', formatCurrencySimple(billData.total)));
    console.log('╚' + line() + '╝');
    
    // In thông tin bổ sung
    if (dayOfWeek) {
        console.log(`\n📅 Ngày: ${dayOfWeek}`);
    }
    console.log(`💳 Kiểu tính tip: ${billData.tip > 0 ? 'Có (5%)' : 'Không'}`);
}

// ========== TEST CASES ==========

console.log("=== TEST 1: HÓA ĐƠN BÌNH THƯỜNG ===\n");
const bill1 = calculateBill(orderItems, null, true);
printBill(bill1);

console.log("\n\n=== TEST 2: NGÀY THỨ 3 (GIẢM THÊM 5%) ===\n");
const bill2 = calculateBill(orderItems, 'wednesday', true);
printBill(bill2, 'Wednesday');

console.log("\n\n=== TEST 3: KHÔNG CÓ TIP ===\n");
const bill3 = calculateBill(orderItems, null, false);
printBill(bill3);

console.log("\n\n=== TEST 4: ĐƠN HÀNG CAO (>1 TRIỆU, GIẢM 15%) ===\n");
const expensiveOrder = [
    { name: 'Cua hoàng đế', price: 350000, quantity: 2 },
    { name: 'Tôm hùm', price: 280000, quantity: 1 },
    { name: 'Rượu vang đỏ', price: 150000, quantity: 1 }
];
const bill4 = calculateBill(expensiveOrder, null, true);
printBill(bill4);

console.log("\n\n=== PHÂN TÍCH ===\n");
console.log("Quy tắc giảm giá:");
console.log("- Tổng > 500,000đ → giảm 10%");
console.log("- Tổng > 1,000,000đ → giảm 15%");
console.log("- Ngày thứ 3 (Wednesday) → giảm thêm 5%");
console.log("\nThứ tự tính toán:");
console.log("1. Tính subtotal (cộng tất cả món)");
console.log("2. Tính discount (gộp tất cả %discount)");
console.log("3. Tính afterDiscount = subtotal - discount");
console.log("4. Tính VAT = afterDiscount × 8%");
console.log("5. Tính Tip = afterDiscount × 5% (nếu có)");
console.log("6. Total = afterDiscount + VAT + Tip");
