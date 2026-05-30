# 📝 PHẦN A - KIỂM TRA ĐỌC HIỂU

## Câu A1 - Function Declaration vs Expression vs Arrow

### 1. Function Declaration
```javascript
function tinhThueBaoHiem(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
}
```

### 2. Function Expression
```javascript
const tinhThueBaoHiem = function(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
};
```

### 3. Arrow Function
```javascript
const tinhThueBaoHiem = (luong) => {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
};
```

### Khác nhau về Hoisting

**Hoisting khác nhau:**
- **Function Declaration:** Được hoisting hoàn toàn (cả định nghĩa), có thể gọi trước khi khai báo
- **Function Expression & Arrow:** Chỉ hoisting tên biến (let/const), không hoisting định nghĩa → ReferenceError nếu gọi trước

**Ví dụ cụ thể:**
```javascript
console.log(result1());      // ✅ OK - Function Declaration được hoisting
// function result1() { return "OK"; }

console.log(result2());      // ❌ ReferenceError - result2 is not defined
// const result2 = function() { return "OK"; };

console.log(result3());      // ❌ ReferenceError - result3 is not defined
// const result3 = () => "OK";
```

---

## Câu A2 - Scope & Closure

### Dự đoán Output:

**Đoạn 1 - Counter Closure:**
```
1
2
3
2
2
```

**Giải thích:**
- `increment()` gọi 3 lần → 1, 2, 3
- `decrement()` gọi 1 lần → 2
- `getCount()` trả về 2

Các method này tạo **closure**, nhớ biến `count` của hàm cha.

**Đoạn 2 - var vs let trong setTimeout:**
```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

### Giải thích chi tiết:

**Tại sao var và let khác nhau:**

1. **var trong vòng lặp:**
   - `var` có function scope, không phải block scope
   - Vòng lặp `for` không tạo scope mới cho `var`
   - Khi `setTimeout` callback chạy (sau 100ms), vòng lặp đã kết thúc với `i = 3`
   - Tất cả callback nhìn thấy cùng giá trị `i = 3`

2. **let trong vòng lặp:**
   - `let` có block scope
   - Mỗi iteration của vòng lặp tạo **binding mới** cho `let j`
   - Mỗi callback "capture" giá trị của `j` trong iteration tương ứng
   - Nên callback 1 in 0, callback 2 in 1, callback 3 in 2

---

## Câu A3 - Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
nums.filter(x => x % 2 === 0);  // [2, 4, 6, 8, 10]

// 2. Nhân mỗi số với 3
nums.map(x => x * 3);  // [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

// 3. Tính tổng tất cả
nums.reduce((sum, x) => sum + x, 0);  // 55

// 4. Tìm số đầu tiên > 7
nums.find(x => x > 7);  // 8

// 5. Kiểm tra CÓ số > 10 không
nums.some(x => x > 10);  // false

// 6. Kiểm tra TẤT CẢ đều > 0
nums.every(x => x > 0);  // true

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
nums.map(x => `Số ${x} là ${x % 2 === 0 ? 'chẵn' : 'lẻ'}`);
// ["Số 1 là lẻ", "Số 2 là chẵn", "Số 3 là lẻ", ...]

// 8. Đảo ngược mảng (không mutate gốc)
[...nums].reverse();  // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

---

## Câu A4 - Object Destructuring & Spread

### Dự đoán Output:

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  
// → "iPhone 16" 25990000 8 "Titan"

console.log(specs);                     
// → ReferenceError: specs is not defined
// (specs chỉ là alias, không khai báo biến)

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            
// → 23990000 (ghi đè price)

console.log(updated.sale);             
// → true (thêm property mới)

console.log(product.price);            
// → 25990000 (gốc không đổi - spread tạo object mới)

// Spread gotcha - Shallow copy
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        
// → 16 (đổi!)
```

### Giải thích:

**Tại sao `product.specs.ram` thay đổi?**

- `{ ...product }` là **shallow copy** (sao chép nông)
- Copy properties cấp 1: `name`, `price`, `specs`
- `specs` là object, nên cả copy lẫn gốc cùng trỏ đến **cùng object trong bộ nhớ**
- Khi thay đổi `copy.specs.ram`, cũng thay đổi `product.specs.ram`
- Để deep copy, phải dùng: `JSON.parse(JSON.stringify(...))` hoặc thư viện

---

# 📝 PHẦN C - SUY LUẬN

## Câu C1 - Refactor Code

### Code cũ (xấu):
```javascript
function processOrders(orders) {
    var result = [];
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "completed") {
            if (orders[i].total > 100000) {
                var item = {};
                item.id = orders[i].id;
                item.customer = orders[i].customer;
                item.total = orders[i].total;
                item.discount = orders[i].total * 0.1;
                item.finalTotal = orders[i].total - item.discount;
                result.push(item);
            }
        }
    }
    // Sort by finalTotal descending
    for (var j = 0; j < result.length; j++) {
        for (var k = j + 1; k < result.length; k++) {
            if (result[j].finalTotal < result[k].finalTotal) {
                var temp = result[j];
                result[j] = result[k];
                result[k] = temp;
            }
        }
    }
    return result;
}
```

### Code mới (refactor - 9 dòng):
```javascript
const processOrders = (orders) =>
    orders
        .filter(o => o.status === "completed" && o.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

### Cải thiện:
- Dùng `filter` + `map` thay vì 2 vòng lặp for
- Dùng destructuring để lấy chỉ cần dùng
- Dùng `sort` thay vì bubble sort
- Dùng arrow function + const
- Dùng template gọn: `finalTotal = total * 0.9`

---

## Câu C2 - Thiết kế API (miniArray)

### Implementation:

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        const startIdx = initialValue === undefined ? 1 : 0;
        
        if (initialValue === undefined && arr.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        
        if (initialValue === undefined) {
            accumulator = arr[0];
        }
        
        for (let i = startIdx; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};
```

### Giải thích từng phần:

**map(arr, fn):**
- Loop qua từng element
- Gọi `fn` với (element, index, array)
- Thêm kết quả vào array mới
- Trả về array mới

**filter(arr, fn):**
- Loop qua từng element
- Nếu `fn` trả về true, thêm vào result
- Trả về array các element pass filter

**reduce(arr, fn, initialValue):**
- Khởi tạo accumulator từ initialValue
- Nếu không có initialValue, dùng element đầu
- Loop qua từng element, cập nhật accumulator
- Trả về accumulator cuối cùng
