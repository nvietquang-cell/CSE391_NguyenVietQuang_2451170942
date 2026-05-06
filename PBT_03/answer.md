Câu A1:
1. Inline CSS (CSS trực tiếp trong thẻ)
Cách này sử dụng thuộc tính style trực tiếp bên trong thẻ mở của phần tử HTML.
    Ví dụ code: <h1 style="color: blue;">Chào mừng bạn!</h1>
    Ưu điểm: Có độ ưu tiên (specificity) cao nhất, giúp ghi đè các quy tắc khác một cách nhanh chóng.
    Nhược điểm: Không thể tận dụng bộ nhớ đệm (caching) của trình duyệt, gây khó khăn cho việc bảo trì vì phải sửa từng vị trí nếu muốn thay đổi, và làm trộn lẫn cấu trúc (HTML) với trình bày (CSS).
    Khi nào nên dùng: Thường bị hạn chế dùng trong môi trường thực tế (production), chỉ nên dùng khi cần ghi đè khẩn cấp hoặc cho các style cực kỳ đặc thù.

2. Internal CSS (CSS trong thẻ <style>)
Cách này đặt các quy tắc CSS bên trong cặp thẻ <style> nằm trong phần <head> của file HTML.

    Ví dụ code: 
    <h1>Chào mừng bạn!</h1>
    h1{
        color:blue;
    }
    Ưu điểm: Tốt khi bạn muốn định dạng riêng biệt cho duy nhất một trang HTML đó.
    Nhược điểm: Không thể tái sử dụng cho các trang khác, làm tăng kích thước file HTML.
    Khi nào nên dùng: Dùng cho các bản mẫu (prototype) hoặc khi một trang cụ thể cần những kiểu dáng mà các trang khác không có.

3. External CSS (CSS file riêng)
Đây là cách tạo một file .css riêng biệt và liên kết nó vào HTML bằng thẻ <link>.

    Ví dụ code: 
    <h1>Chào mừng bạn!</h1> tạo 1 file css mới và trong file html phải có câu lệnh này <link rel="stylesheet" href="styles.css"> để 
    có thể kết nối vs nhau trong và h trong file css bạn có thể viết code vd như là:
    h1{
        color:blue;
    }
    Ưu điểm:
        Caching: Trình duyệt lưu lại file, giúp các trang sau load nhanh hơn.
        Dễ bảo trì: Tách biệt rõ ràng giữa cấu trúc và giao diện.
    Nhược điểm: Cần thêm một yêu cầu HTTP để tải file (tuy nhiên ưu điểm về caching đã bù đắp điều này).
    Khi nào nên dùng: Là lựa chọn ưu tiên hàng đầu cho các dự án thực tế (production)

Câu hỏi thêm: Cách nào "thắng" nếu áp dụng đồng thời?
Nếu cùng một phần tử chịu ảnh hưởng của cả 3 cách, Inline CSS sẽ "thắng" (được ưu tiên cao nhất).
Giải thích: Theo quy tắc về độ ưu tiên (specificity) trong CSS:
    Inline CSS luôn có mức ưu tiên cao nhất về mặt kỹ thuật vì nó gắn trực tiếp vào phần tử.
    Internal CSS và External CSS có độ ưu tiên thấp hơn. Nếu cả hai có cùng độ ưu tiên về selector, quy tắc nào xuất hiện sau trong file HTML sẽ ghi đè quy tắc phía trước

Câu A2:
1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 25.990.000đ 45.990.000đ
3. #app header                  → Chọn: → Chọn toàn bộ thẻ <header> bên trong #app, chứa text: ShopTLU Home Products About
4. nav a:first-child             → Chọn: → Chọn thẻ <a> đầu tiên trong <nav>: Home
5. .product.featured h2         → Chọn: → Chọn <h2> bên trong .product.featured:MacBook Pro
6. article > p                  → Chọn: → Chọn tất cả <p> là con trực tiếp của <article>: 25.990.000đ
7. a[href="/"]                  → Chọn: → Chọn thẻ <a> có href="/": Home
8. .top-bar.dark h1              → Chọn: → Chọn <h1> bên trong .top-bar.dark: ShopTLU

Câu A3:
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 450px
→ Không gian chiếm trên trang = 470px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 350px
→ Không gian chiếm trên trang = 420px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px
Khoảng cách giữa .box-a và .box-b
= 40px
Giải thích (tại sao KHÔNG phải 65px):
Vì hiện tượng margin collapse (gộp margin) xảy ra giữa hai phần tử block liền kề theo chiều dọc.
Thay vì cộng lại (25 + 40), trình duyệt chỉ lấy giá trị lớn hơn.
→ max(25px, 40px) = 40px

.box-a { margin-bottom: -10px; }
.box-b { margin-top: 40px; }
Khoảng cách giữa .box-a và .box-b:
= 40 + (-10) = 30px

Câu A4:
1.
Rule A: p
→ (0, 0, 1)
Rule B: .price
→ (0, 1, 0)
Rule C: #main-price
→ (1, 0, 0)
Rule D: p.price
→ (0, 1, 1)
2.Kết quả: màu đỏ (red) từ Rule C vì có độ ưu tiên cao nhất
3.Sẽ có màu cam
4.element sẽ có màu đen do có lệch !important là lệnh có độ ưu tiên cao nhất

Câu C1:
1. Tính chiều rộng thực tế (content-box)
.sidebar
width = 300
padding = 20 × 2 = 40
border = 1 × 2 = 2
→ Tổng = 300 + 40 + 2 = 342px

.content
width = 660
padding = 30 × 2 = 60
border = 1 × 2 = 2
→ Tổng = 660 + 60 + 2 = 722px

2. Vì sao layout bị vỡ?
Container = 960px
Tổng 2 cột = 342 + 722 = 1064px
1064px > 960px → không đủ chỗ
→ .content bị đẩy xuống dòng

3. Cách sửa
Cách 1: Dùng border-box (đơn giản nhất)
Giữ nguyên width, nhưng đổi cách tính box:
.sidebar, .content {
    box-sizing: border-box;
}
Cách 2: Không dùng border-box
Phải trừ padding + border vào width
.sidebar {
    width: 250px; 
}
.content {
    width: 600px; 
}

Câu C2:
1. "Sản phẩm A" (h2)
font-size = 20px
Vì:
.card .title { font-size: 20px; } → áp trực tiếp vào h2
Có các giá trị khác:
body { font-size: 16px } (inherit)
.container { font-size: 14px } (inherit)
Nhưng rule áp trực tiếp luôn thắng inheritance

color = green vì có lệnh !important là lệnh có độ ưu tiên cao nhất

2. color = blue
Các rule:
.card { color: blue }
.card p { color: inherit }
Phân tích:
p nhận rule: color: inherit
→ kế thừa từ cha .card
→ .card có color: blue
Không có rule nào override thêm
Kết luận: blue

3. "Sản phẩm B" (h2)
font-size = 20px
Giống case A:
.card .title áp trực tiếp → 20px
color = blue

Các rule:
.card { color: blue }
Không có #featured
Không có .highlight
h2 không có color riêng → inherit từ .card
Kết luận: blue

4. Mô tả sản phẩm B" (p.highlight)
color = green
Các rule:
.card { color: blue }
.card p { color: inherit }
.highlight { color: green !important }
.highlight có !important → override hết

Kết luận: green

Bài B2:
Hộp 1 (content-box): 350px (đo từ DevTools)
Hộp 2 (border-box): 300px (đo từ DevTools)
Giải thích sự khác biệt: do sử dụng thuộc tính box-sizing nên kích thước của 2 hộp sẽ khác nhau