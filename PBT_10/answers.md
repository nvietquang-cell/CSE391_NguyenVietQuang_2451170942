# 🎯 PHẦN A & C — ANSWERS

## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 — DOM Tree & querySelector (5đ)

#### 1. DOM Tree Diagram:
```
#app
├── header
│   ├── h1 (textContent: "Todo App")
│   └── nav
│       ├── a.active (href="#", textContent: "All")
│       ├── a (href="#", textContent: "Active")
│       └── a (href="#", textContent: "Completed")
├── main
│   ├── form#todoForm
│   │   ├── input#todoInput
│   │   └── button (type: submit, textContent: "Add")
│   └── ul#todoList
│       ├── li.todo-item (textContent: "Learn HTML")
│       └── li.todo-item.completed (textContent: "Learn CSS")
```

#### 2. querySelector Solutions:

| Yêu cầu | querySelector |
|--------|---|
| Chọn thẻ `<h1>` | `document.querySelector("h1")` |
| Input trong form | `document.querySelector("#todoForm input")` |
| Tất cả `.todo-item` | `document.querySelectorAll(".todo-item")` |
| Link đang active | `document.querySelector("nav a.active")` |
| `<li>` đầu tiên | `document.querySelector("#todoList li")` hoặc `document.querySelector("#todoList li:first-child")` |
| Tất cả `<a>` trong `<nav>` | `document.querySelectorAll("nav a")` |

---

### Câu A2 — innerHTML vs textContent (5đ)

#### Sự Khác Biệt:

| Thuộc tính | Công dụng | Xử lý HTML |
|-----------|---------|-----------|
| `textContent` | Lấy/gán **text thuần** | Bỏ qua HTML tags, hiển thị dạng string |
| `innerHTML` | Lấy/gán **HTML code** | Parse & render HTML tags |

#### Ví Dụ:
```javascript
const div = document.querySelector("div");

// Với HTML: <div><b>Hello</b></div>

div.textContent;   // "Hello"
div.innerHTML;     // "<b>Hello</b>"

// Gán giá trị:
div.textContent = "<b>World</b>";  // Hiển thị: <b>World</b> (text)
div.innerHTML = "<b>World</b>";    // Hiển thị: **World** (bold)
```

#### Khi nào dùng mỗi cái:
- **`textContent`**: 
  - Khi chỉ muốn hiển thị **text không định dạng**
  - Khi gán giá trị từ **user input** (bảo mật)
  - Performance tốt hơn (không parse HTML)
  
- **`innerHTML`**:
  - Khi cần render **HTML content** (layout, styling)
  - Tạo HTML từ **trusted source** (không user input)

#### ⚠️ XSS Vulnerability Explanation:

**innerHTML gây lỗ hổng XSS vì:**
- Parse và execute script tags
- Attacker có thể chèn code JavaScript vào HTML
- Có thể đánh cắp cookies, session, data nhạy cảm

**Ví dụ tấn công:**
```javascript
const userInput = document.querySelector("#search").value;
// User nhập: <img src=x onerror="alert('Hacked!')">

document.querySelector("#result").innerHTML = userInput;
// ❌ NGUY HIỂM: Script sẽ chạy!
```

**Cách Sửa:**
```javascript
// Cách 1: Dùng textContent (nếu không cần HTML)
document.querySelector("#result").textContent = userInput;

// Cách 2: Escape HTML
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
document.querySelector("#result").innerHTML = escapeHTML(userInput);

// Cách 3: DOMPurify library (recommended)
document.querySelector("#result").innerHTML = DOMPurify.sanitize(userInput);
```

---

### Câu A3 — Event Bubbling (5đ)

#### Dự đoán Output:

```javascript
// Click vào button → Output:
BUTTON
INNER
OUTER

// Giải thích: Event bubbles từ innermost → outermost
// Button clicked → Trigger "BUTTON"
// Bubble lên inner div → Trigger "INNER"
// Bubble lên outer div → Trigger "OUTER"
```

#### Nếu uncomment `e.stopPropagation()`:

```javascript
// Click vào button → Output:
BUTTON

// Giải thích: stopPropagation() dừng event bubbling ngay lập tức
// "INNER" và "OUTER" sẽ KHÔNG được trigger
```

#### Event Bubbling Phase Diagram:

```
Click trên #btn
    ↓
#btn listener → console.log("BUTTON")  [Capturing Phase → Target Phase]
    ↓ (BUBBLE UP)
#inner listener → console.log("INNER")  [Bubbling Phase]
    ↓ (BUBBLE UP)
#outer listener → console.log("OUTER")  [Bubbling Phase]
    ↓
END
```

---

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 — Debug DOM Code (8đ)

#### Các Lỗi Tìm Được:

| # | Dòng | Lỗi | Sửa |
|---|------|-----|-----|
| 1 | 10 | `countDisplay.innerHTML = count` (không cần innerHTML cho số) | `countDisplay.textContent = count` |
| 2 | 21 | `addEventListener("onclick", ...)` sai event name | `addEventListener("click", ...)` |
| 3 | 26 | `countDisplay = count` gán lại biến DOM | `countDisplay.textContent = count` |
| 4 | 27 | `historyList.innerHTML = null` không phải cách xóa | `historyList.innerHTML = ""` hoặc `historyList.textContent = ""` |
| 5 | 34 | `item.remove` (thiếu dấu ngoặc) | `item.remove()` |
| 6 | 40 | `beforeunload` không phù hợp, nên dùng `change` event hoặc auto-save | Thêm event listener khi count thay đổi để save |
| 7 | 46 | `localStorage.getItem()` trả về string, cần parse | `count = parseInt(localStorage.getItem("count")) \|\| 0` |

#### Code Sửa Hoàn Chỉnh:

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

function saveToLocalStorage() {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
}

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;  // FIX: innerHTML → textContent
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
    saveToLocalStorage();
});

document.querySelector("#decrementBtn").addEventListener("click", function() {  // FIX: "onclick" → "click"
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;  // FIX: countDisplay = count → textContent
    historyList.innerHTML = "";  // FIX: null → ""
    saveToLocalStorage();
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
    saveToLocalStorage();
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();  // FIX: remove → remove()
    });
    saveToLocalStorage();
});

// Load from localStorage
window.addEventListener("load", () => {
    const savedCount = localStorage.getItem("count");
    const savedHistory = localStorage.getItem("history");
    
    if (savedCount) {
        count = parseInt(savedCount);  // FIX: Add parseInt
        countDisplay.textContent = count;
    }
    
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }
});
```

---

### Câu C2 — Performance & Event Delegation (7đ)

#### 1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?

**Vấn đề:**
- **Memory overhead**: Tạo 1000 event listeners → chiếm 1000 lần memory
- **DOM performance**: Mỗi lần thêm/xóa element phải rebind event → slow
- **Garbage collection**: 1000 functions objects giữ reference đến scope → khó garbage collect
- **Reflow/Repaint**: Thêm 1000 listeners trigger browser reflow nhiều lần

**Ví dụ xấu:**
```javascript
const items = document.querySelectorAll(".item");
items.forEach(item => {
    item.addEventListener("click", handleClick);  // ❌ 1000 listeners!
});
```

#### Event Delegation giải quyết thế nào?

**Event Delegation:**
- Bind event listener lên **parent element** chung
- Khi event xảy ra, dùng `e.target` để check xem element nào triggered
- Tất cả child elements tự động handle event thông qua bubbling

**Lợi ích:**
- ✅ Memory: Chỉ 1 listener thay vì 1000
- ✅ Performance: Không cần rebind khi thêm/xóa items
- ✅ Dynamic: Automatically handle mới added elements
- ✅ GC friendly: Ít function references

**Ví dụ tốt:**
```javascript
const list = document.querySelector(".items-list");  // Parent

list.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
        handleClick(e.target);  // ✅ Chỉ 1 listener!
    }
});
```

#### 2. Refactor với DocumentFragment

**Vấn đề code gốc:**
```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ❌ 1000 lần reflow!
}
```

**Giải thích vấn đề:**
- Mỗi lần `appendChild` đều trigger browser reflow (recalculate layout)
- 1000 lần appendChild = 1000 lần reflow → **RẤT CHẬM**

**Cách Refactor với DocumentFragment:**
```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);  // Append vào fragment (không trigger reflow)
}

document.body.appendChild(fragment);  // ✅ Chỉ 1 lần reflow!
```

**Tại sao nhanh hơn:**
- `DocumentFragment` là **virtual DOM** (không nằm trong actual DOM)
- Append vào fragment **không trigger reflow**
- Khi `appendChild(fragment)` vào body, fragment được "flattened" → tất cả children thêm vào
- Kết quả: **Chỉ 1 lần reflow** thay vì 1000 lần

**Performance Comparison:**
```
❌ Cách cũ: 1000 appendChild → 1000 reflows → 3000ms
✅ DocumentFragment: 1 appendChild → 1 reflow → 10ms
```

**Advanced: Thêm event delegation vào:**
```javascript
const fragment = document.createDocumentFragment();
const container = document.querySelector("#container");

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = `Item ${i}`;
    div.dataset.id = i;
    fragment.appendChild(div);
}

container.appendChild(fragment);

// Event Delegation
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
        console.log(`Clicked item ${e.target.dataset.id}`);
    }
});
```


