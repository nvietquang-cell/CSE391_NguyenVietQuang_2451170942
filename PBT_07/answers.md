# 📝 PHẦN A - KIỂM TRA ĐỌC HIỂU

## Câu A1 - var / let / const

### Dự đoán:
```
Đoạn 1: undefined  (hoisting)
Đoạn 2: ReferenceError (Temporal Dead Zone)
Đoạn 3: TypeError (không thể gán lại const)
Đoạn 4: [1, 2, 3, 4]  (const không ngăn thay đổi nội dung mảng)
Đoạn 5: 
  Trong block: 2
  Ngoài block: 1
```

### Giải thích:
- **Đoạn 1:** `var` được hoisting lên đầu scope, nên `x` đã khai báo nhưng chưa gán giá trị → `undefined`
- **Đoạn 2:** `let` có Temporal Dead Zone (TDZ), không được hoisting → `ReferenceError`
- **Đoạn 3:** `const` không thể gán lại → `TypeError`
- **Đoạn 4:** `const` chỉ ngăn gán lại reference, không ngăn thay đổi nội dung → thêm phần tử được
- **Đoạn 5:** `let` có block scope, biến `a` trong block khác với ngoài block

---

## Câu A2 - Data Types & Coercion

### Dự đoán:
```javascript
typeof null                    // "object" (bug cổ điển)
typeof undefined              // "undefined"
typeof NaN                    // "number"
"5" + 3                       // "53" (string concatenation)
"5" - 3                       // 2 (numeric coercion)
"5" * "3"                     // 15 (numeric coercion)
true + true                   // 2 (boolean → number)
[] + []                       // "" (empty string)
[] + {}                       // "[object Object]"
{} + []                       // 0 (hoisting issue)
```

### Giải thích:
- **`"5" + 3` vs `"5" - 3`:** 
  - Operator `+` được sử dụng cho cả cộng số và nối chuỗi. Khi một toán hạng là string, nó nối chuỗi
  - Operator `-` chỉ dùng cho toán học số, nên JavaScript convert chuỗi thành số
  - Quy tắc: Nếu một trong hai toán hạng là string, `+` nối chuỗi; `-`, `*`, `/` convert sang số

---

## Câu A3 - So sánh == vs ===

### Dự đoán:
```javascript
5 == "5"                      // true (type coercion)
5 === "5"                     // false (strict type check)
null == undefined             // true (loose equality exception)
null === undefined            // false (strict type check)
NaN == NaN                    // false (NaN never equals itself)
0 == false                    // true (type coercion)
0 === false                   // false (different type)
"" == false                   // true (type coercion)
```

### Quy tắc:
- **Nên dùng `===`** vì:
  - Tránh lỗi type coercion bất ngờ
  - Rõ ràng, dễ debug
  - Hiệu suất tốt hơn (không cần convert type)
  - Đây là best practice trong JavaScript hiện đại

---

## Câu A4 - Truthy & Falsy

### Tất cả giá trị Falsy:
1. `false`
2. `0`
3. `-0`
4. `0n` (BigInt zero)
5. `""` (empty string)
6. `null`
7. `undefined`
8. `NaN`

### Dự đoán:
```javascript
if ("0") console.log("A");      // In - string "0" là truthy
if ("") console.log("B");       // KHÔNG in - empty string là falsy
if ([]) console.log("C");       // In - array là truthy
if ({}) console.log("D");       // In - object là truthy
if (null) console.log("E");     // KHÔNG in - null là falsy
if (0) console.log("F");        // KHÔNG in - 0 là falsy
if (-1) console.log("G");       // In - số âm là truthy
if (" ") console.log("H");      // In - space string là truthy
```

---

## Câu A5 - Template Literals

### Cách 1 - Greeting:
```javascript
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

### Cách 2 - URL:
```javascript
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

### Cách 3 - HTML:
```javascript
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

---

# 📝 PHẦN C - SUY LUẬN

## Câu C1 - Debug JavaScript

### Lỗi tìm thấy:

1. **Dòng 2:** Thiếu dấu `;` sau `}`
   ```javascript
   // SAI:
   if (phanTramGiam < 0 || phanTramGiam > 100) {
       return "Phần trăm giảm không hợp lệ"
   }
   // ĐÚNG:
   if (phanTramGiam < 0 || phanTramGiam > 100) {
       return "Phần trăm giảm không hợp lệ";
   }
   ```

2. **Dòng 5:** Thiếu dấu `;`
   ```javascript
   var giamGia = giaBan * phanTramGiam / 100;  // Thêm ;
   ```

3. **Dòng 8:** Dùng `=` (gán) thay vì `==` hoặc `===` (so sánh)
   ```javascript
   // SAI:
   if (giaSauGiam = 0) {
   // ĐÚNG:
   if (giaSauGiam === 0) {
   ```

4. **Dòng 9:** Thiếu dấu `;`
   ```javascript
   console.log("Sản phẩm miễn phí!");
   ```

5. **Dòng 13:** Input là string "100000" nhưng code không validate. Cần check type:
   ```javascript
   if (typeof giaBan !== 'number' || typeof phanTramGiam !== 'number') {
       return "Lỗi: Input không phải số";
   }
   ```

6. **Dòng 17:** Missing validation
   ```javascript
   const gia = tinhGiaGiamGia("100000", 20)  // "100000" phải là số
   ```

7. **Lỗi ẩn với var trong vòng lặp (dòng 20-24):**
   ```javascript
   // SAI - var có function scope, tất cả callback sẽ print "Item 5"
   for (var i = 0; i < 5; i++) {
       setTimeout(function() {
           console.log("Item " + i)  // i=5 khi callback chạy
       }, 1000)
   }
   
   // ĐÚNG - dùng let có block scope
   for (let i = 0; i < 5; i++) {
       setTimeout(function() {
           console.log("Item " + i)  // i giữ giá trị trong block
       }, 1000)
   }
   ```

### Giải thích chi tiết lỗi var:
- `var` có **function scope**, không phải block scope
- Vòng lặp `for` không tạo scope mới cho `var`
- Khi `setTimeout` callback chạy, vòng lặp đã kết thúc, `i = 5`
- Tất cả callback đều nhìn thấy `i = 5`
- Với `let`, mỗi iteration tạo block scope mới, `i` được "capture"

---

## Câu C2 - Hóa đơn nhà hàng

### Yêu cầu chức năng:
- Tính tổng tiền từ danh sách món ăn
- Áp dụng giảm giá theo điều kiện
- Tính VAT 8%
- Tính tip 5% (tùy chọn)
- Hiển thị hóa đơn chi tiết

### Quy tắc giảm giá:
- Tổng > 500,000 → giảm 10%
- Tổng > 1,000,000 → giảm 15%
- Ngày thứ 3 (Wednesday) → giảm thêm 5%

### Xem file `restaurant_bill.js` để chi tiết code
