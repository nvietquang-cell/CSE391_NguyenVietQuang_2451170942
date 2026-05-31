# PBT_10 — Answers (Phần A + C)

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### A1 — Sync vs Async (5đ)

Mã in ra theo thứ tự:

1. `1 - Start`
2. `4 - End`
3. `3 - Promise`
4. `6 - Promise 2`
5. `2 - Timeout 0ms`
6. `7 - Nested timeout`
7. `5 - Timeout 100ms`

Giải thích ngắn: Call stack chạy đồng bộ (`1`, `4`). Các Promise callbacks đi vào Microtask queue (chạy ngay sau call stack): `3`, `6`. Các `setTimeout` là macrotask — chỉ chạy sau khi microtasks xong; do đó `2` (timeout 0ms) và sau đó nested timeout `7` (được lập lịch trong microtask) sẽ chạy trước `5` (100ms).

### A2 — Fetch API (5đ)

1. `await fetch(...)` — `fetch` trả về một `Promise` resolve thành `Response` object. Dùng `await` để chờ Promise hoàn thành và nhận `Response`.
2. `response.ok` — `false` khi status HTTP ngoài khoảng 200-299, ví dụ: `404 Not Found`, `500 Internal Server Error`, `429 Too Many Requests`.
3. `response.json()` — trả về Promise vì phải đọc body stream và parse JSON; cần `await` để có object JSON.
4. `try...catch` — Catch được lỗi mạng (network failure), lỗi parsing JSON (invalid JSON), hoặc lỗi do `throw new Error` khi `!response.ok`. HTTP error như 404 sẽ không tự động reject fetch, nên cần kiểm tra `response.ok`.

### A3 — Promise States (5đ)

- Ba trạng thái: `Pending` → `Fulfilled` (khi resolve) hoặc `Pending` → `Rejected` (khi reject).

Callback Hell: là khi callback lồng callback nhiều cấp khiến code khó đọc.

Ví dụ callback-hell 4 cấp:

```javascript
doA(arg, (err, a) => {
  doB(a, (err, b) => {
    doC(b, (err, c) => {
      doD(c, (err, d) => {
        // xử lý
      });
    });
  });
});
```

Refactor với async/await:

```javascript
async function run() {
  try {
    const a = await doA(arg);
    const b = await doB(a);
    const c = await doC(b);
    const d = await doD(c);
    // xử lý
  } catch (err) {
    console.error(err);
  }
}
```

## PHẦN C — PHÂN TÍCH (10đ + 10đ)

### C1 — Error Handling Strategy (10đ)

1) Network errors (mất mạng):
- Hiển thị thông báo người dùng (toast), bật lại trạng thái offline UI.
- Thử lại tự động theo backoff với `fetchWithRetry` hoặc cho người dùng nút 'Thử lại'.

2) API errors (500, 404, 429):
- 4xx (client error, 404): thông báo rõ ràng (ví dụ: "Không tìm thấy sản phẩm").
- 5xx (server error): thông báo tạm thời, khuyên thử lại sau; log để gửi về lỗi hệ thống.
- 429 (rate limit): đọc header `Retry-After` nếu có, hoặc áp dụng exponential backoff trước khi retry.

3) Timeout (>10s):
- Hủy request sau 10s bằng `AbortController`.

Ví dụ `fetchWithTimeout`:

```javascript
async function fetchWithTimeout(url, ms = 10000, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}
```

4) Retry logic — `fetchWithRetry` (thử lại 3 lần khi network error):

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3, backoff = 500) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      const isNetworkError = err.name === 'TypeError' || err.name === 'AbortError';
      if (i === maxRetries - 1 || !isNetworkError) throw err;
      await new Promise(r => setTimeout(r, backoff * Math.pow(2, i)));
    }
  }
}
```

Giải thích: chỉ retry khi lỗi mạng/timeout; với lỗi HTTP 4xx/5xx thường không tự động retry (trừ 429 với Retry-After).

### C2 — Promise methods (10đ)

- `.all()`: resolve khi tất cả Promise resolve; reject ngay khi một Promise reject. Dùng khi mọi kết quả đều cần thiết.
- `.allSettled()`: chờ tất cả hoàn thành bất kể resolve/reject, trả trạng thái cho từng Promise. Dùng khi cần hiển thị kết quả độc lập, 1 API lỗi không phá cả batch.
- `.race()`: trả Promise của lời hứa đầu tiên resolve/reject. Dùng cho timeout hoặc khi chỉ cần kết quả nhanh nhất.
- `.any()`: resolve khi bất kỳ Promise nào resolve; reject khi tất cả reject. Dùng khi cần bất kỳ nguồn thành công nào.

Ví dụ thực tế (mô tả ngắn trong file bài nộp): sử dụng `Promise.allSettled` cho dashboard tổng hợp API để mỗi widget xử lý riêng lẻ.

---

Ghi chú: Tôi đã tạo mã ví dụ và các app mẫu trong các thư mục `weather_app/`, `user_directory/`, `gallery/`, `dashboard/` để minh hoạ và nộp bài.
