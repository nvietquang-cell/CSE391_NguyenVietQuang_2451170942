Bài A1:
1. Thẻ <meta viewport> chuẩn và giải thích
Thẻ chuẩn:
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Giải thích từng thuộc tính:
name="viewport": Khai báo cho trình duyệt biết đây là các thiết lập về khung nhìn (vùng hiển thị nội dung).
width=device-width: Đặt chiều rộng của trang web bằng đúng chiều rộng màn hình của thiết bị. Nếu không có cái này, trình duyệt di động thường tự giả định chiều rộng là 980px (desktop).
initial-scale=1.0: Thiết lập mức độ phóng thu (zoom) ban đầu khi trang vừa tải xong là 1:1 (không phóng to, không thu nhỏ).

2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị như thế nào?
Nếu thiếu thẻ viewport, iPhone (và hầu hết các trình duyệt di động) sẽ coi trang web của bạn là một trang dành cho máy tính (Desktop site).
Cơ chế: Nó sẽ "giả lập" một khung nhìn rộng khoảng 980px.
Hiển thị: Để hiển thị hết toàn bộ 980px đó trên màn hình nhỏ của điện thoại, trình duyệt sẽ tự động thu nhỏ (zoom out) toàn bộ trang lại.
Hậu quả: Chữ và các nút bấm sẽ trở nên cực kỳ nhỏ, người dùng phải dùng hai ngón tay để phóng to mới có thể đọc được nội dung.

3. Mobile-First và Desktop-First
Sự khác biệt:
Mobile-First: Là cách tiếp cận viết code cho màn hình nhỏ nhất (điện thoại) trước, sau đó dùng Media Query với điều kiện min-width để bổ sung hoặc thay đổi thuộc tính khi màn hình lớn dần lên.
Desktop-First: Là cách tiếp cận viết code cho màn hình lớn (máy tính) trước, sau đó dùng Media Query với điều kiện max-width để co lại hoặc ẩn bớt thành phần khi màn hình nhỏ đi.
Ví dụ CSS với breakpoint 768px:
Cách viết Mobile-First (Khuyên dùng):
Cách viết Desktop-First:
Tại sao Mobile-First được khuyên dùng?
Tối ưu hiệu năng (Performance): Thiết bị di động thường có cấu hình và tốc độ mạng yếu hơn máy tính. Việc ưu tiên tải những đoạn mã CSS đơn giản trước giúp trang web hiển thị nhanh hơn trên điện thoại.
Tư duy thiết kế tập trung: Buộc người thiết kế và lập trình phải ưu tiên những nội dung quan trọng nhất do không gian màn hình nhỏ hạn chế, tránh việc nhồi nhét quá nhiều thành phần không cần thiết.
Dễ quản lý code: Trong SCSS, việc sử dụng mixins để quản lý media queries theo hướng Mobile-First giúp cấu trúc code sạch sẽ và dễ bảo trì hơn.

Câu A2:
1. Extra Small (xs)
Kích thước: < 576px
Thiết bị đại diện: Điện thoại di động cầm dọc (Portrait phones).
Ví dụ lưới sản phẩm: 1 cột. Trên màn hình rất nhỏ, việc hiển thị 1 cột giúp hình ảnh sản phẩm đủ lớn để người dùng nhìn rõ và dễ dàng dùng ngón tay chạm vào.
2. Small (sm)
Kích thước: ≥ 576px
Thiết bị đại diện: Điện thoại di động cầm ngang (Landscape phones).
Ví dụ lưới sản phẩm: 2 cột. Không gian chiều ngang đã rộng hơn một chút, có thể chia đôi để người dùng xem được nhiều sản phẩm hơn mà không phải cuộn quá nhiều.
3. Medium (md)
Kích thước: ≥ 768px
Thiết bị đại diện: Máy tính bảng (Tablets).
Ví dụ lưới sản phẩm: 3 cột. Đây là breakpoint phổ biến cho các thiết bị như iPad. 3 cột là tỉ lệ cân đối giữa kích thước ảnh và lượng thông tin.
4. Large (lg)
Kích thước: ≥ 992px
Thiết bị đại diện: Máy tính xách tay (Laptops), màn hình máy tính để bàn nhỏ.
Ví dụ lưới sản phẩm: 4 cột. Tận dụng chiều ngang rộng của màn hình máy tính để hiển thị nhiều sản phẩm cùng lúc.
5. Extra Large (xl)
Kích thước: ≥ 1200px
Thiết bị đại diện: Màn hình máy tính để bàn lớn (Desktops).
Ví dụ lưới sản phẩm: 4 hoặc 5 cột. Tùy thuộc vào thiết kế, bạn có thể giữ 4 cột nhưng tăng kích thước lề (gutter) hoặc tăng lên 5 cột để lấp đầy không gian.
6. Extra Extra Large (xxl)
Kích thước: ≥ 1400px
Thiết bị đại diện: Màn hình máy tính siêu lớn hoặc màn hình TV.
Ví dụ lưới sản phẩm: 6 cột. Với màn hình cực rộng, việc hiển thị 6 sản phẩm trên một hàng giúp giao diện trông chuyên nghiệp và tận dụng tối đa diện tích hiển thị.

Câu A3:
Chiều rộng màn hình 375px (iPhone SE): .container width: 100%
Giải thích: Kích thước này nhỏ hơn mốc 576px, nên nó nhận giá trị mặc định được khai báo đầu tiên.
Chiều rộng màn hình 600px: .container width: 540px
Giải thích: 600px đã vượt qua mốc min-width: 576px nhưng chưa tới mốc 768px.
Chiều rộng màn hình 800px: .container width: 720px
Giải thích: 800px vượt qua mốc min-width: 768px nhưng chưa tới mốc 992px.
Chiều rộng màn hình 1000px: .container width: 960px
Giải thích: 1000px vượt qua mốc min-width: 992px nhưng chưa tới mốc 1200px.
Chiều rộng màn hình 1400px: .container width: 1140px
Giải thích: 1400px đã vượt qua mốc cao nhất là min-width: 1200px, nên nó nhận giá trị cuối cùng.

Câu A4:
1. Bốn tính năng chính của SCSS
Variables (Biến - $variable):
Giải thích: Biến được coi là các "design tokens", giúp lưu trữ các giá trị sử dụng nhiều lần (như màu sắc, phông chữ) tại một nơi duy nhất
Khi cần thay đổi, bạn chỉ cần sửa một chỗ và tất cả các vị trí sử dụng biến đó sẽ tự động cập nhật theo
Ví dụ:
Nesting (Viết CSS lồng nhau):
Giải thích: Cho phép viết các quy tắc CSS lồng vào nhau theo đúng cấu trúc phân cấp của HTML, giúp code rõ ràng và dễ quản lý hơn
Tuy nhiên, quy tắc quan trọng là không được lồng quá 3 cấp để tránh tạo ra các selector quá dài và khó ghi đè
Ví dụ:
Mixins (@mixin và @include):
Giải thích: Được coi là các "hàm CSS tái sử dụng"
Bạn sử dụng @mixin để định nghĩa (khai báo) một nhóm các thuộc tính và dùng @include để gọi (sử dụng) chúng ở bất kỳ đâu
Ví dụ:
@extend / Inheritance (Kế thừa):
Giải thích: Cho phép một selector chia sẻ hoặc kế thừa toàn bộ các thuộc tính từ một selector khác, giúp giảm bớt việc lặp lại code. (Lưu ý: Mặc dù tài liệu đề cập đến tính năng này trong mục lục, nhưng phần nội dung chi tiết chủ yếu tập trung vào Variables, Nesting và Mixins).


2. Tại sao trình duyệt KHÔNG đọc được file .scss và bước chuyển đổi
Lý do: Trình duyệt không thể đọc trực tiếp các file SCSS vì chúng chứa các cú pháp đặc biệt (như biến, hàm, lồng nhau) mà tiêu chuẩn CSS thông thường không có
Trình duyệt chỉ có khả năng hiểu và thực thi các file CSS tiêu chuẩn
Bước chuyển đổi (Compile): Bạn cần thực hiện bước biên dịch (compile) để chuyển đổi mã nguồn từ SCSS sang CSS.
Cách thực hiện: Bạn có thể sử dụng các công cụ như Extension "Live Sass Compiler" trong VS Code, hoặc các bộ công cụ build như Webpack, Vite.
Quy trình: Khi bạn bật chế độ "Watch Sass", công cụ sẽ tự động theo dõi các thay đổi trong file .scss và tự động tạo ra (generate) một file .css tương ứng để trình duyệt có thể đọc được.

Bai C1:
Trong phần này khi em mở chức năng cho điện thoại cho máy tính bảng thì em lại kh thấy web tiki.vn nó thay đổi gì. Nhưng khi mở điện thoại thì em thấy nó thu vừa vs màn hình 

Câu C2:
1. Wireframe Responsive Strategy
Mobile (<768px)
Layout: 1 cột
Ẩn bớt:
hero text phụ
một số ảnh món ăn phụ
Form đặt bàn đặt ngay dưới hero
Google Maps đặt cuối trang
-------------------
| Logo   ☎ Hotline |
-------------------
|     HERO IMAGE   |
-------------------
|   FORM ĐẶT BÀN   |
| ngày | giờ       |
| số người          |
| ghi chú           |
-------------------
| ẢNH MÓN ĂN       |
| [1]              |
| [2]              |
| [3]              |
-------------------
| GOOGLE MAPS      |
-------------------
|      FOOTER      |
-------------------
Tablet (768px → 1024px)
Layout: 2 cột nhẹ
Grid món ăn: 2 hoặc 3 cột
Form + Maps có thể nằm cạnh nhau
-----------------------------------
| Logo               Hotline      |
-----------------------------------
|          HERO IMAGE             |
-----------------------------------
| FORM ĐẶT BÀN |   GOOGLE MAPS   |
-----------------------------------
|   [1]    [2]    [3]             |
|   [4]    [5]    [6]             |
-----------------------------------
|            FOOTER               |
-----------------------------------
Desktop (>1024px)
Layout: 12-column grid
Hero full width
Grid món ăn: 3 cột
Có thể thêm sidebar:
giờ mở cửa
ưu đãi
review
-------------------------------------------------
| Logo              MENU              Hotline   |
-------------------------------------------------
|               HERO IMAGE                     |
-------------------------------------------------
| FOOD GRID (3 cột)      |   SIDEBAR           |
| [1] [2] [3]            | - Booking info      |
| [4] [5] [6]            | - Promotion         |
-------------------------------------------------
| FORM ĐẶT BÀN | GOOGLE MAPS                   |
-------------------------------------------------
|                    FOOTER                    |
-------------------------------------------------
2. CSS Skeleton — Mobile First
/* ===== RESET ===== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family: Arial, sans-serif;
}

/* ===== LAYOUT ===== */

.container{
    width:100%;
    padding:16px;
}

/* ===== HEADER ===== */

.header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:16px 0;
}

/* ===== HERO ===== */

.hero img{
    width:100%;
    display:block;
}

/* ===== FOOD GRID ===== */

.food-grid{
    display:grid;
    grid-template-columns:1fr;
    gap:16px;
    margin:20px 0;
}

.food-item img{
    width:100%;
    border-radius:8px;
}

/* ===== BOOKING ===== */

.booking{
    display:grid;
    grid-template-columns:1fr;
    gap:12px;
    margin-bottom:20px;
}

/* ===== MAP ===== */

.map iframe{
    width:100%;
    height:300px;
    border:0;
}

/* ===== FOOTER ===== */

.footer{
    text-align:center;
    padding:20px;
}

/* ===================================== */
/* TABLET */
/* ===================================== */

@media screen and (min-width:768px){

    .food-grid{
        grid-template-columns:repeat(2,1fr);
    }

    .booking-map{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:20px;
    }
}

/* ===================================== */
/* DESKTOP */
/* ===================================== */

@media screen and (min-width:1024px){

    .main-layout{
        display:grid;
        grid-template-columns:3fr 1fr;
        gap:24px;
    }

    .food-grid{
        grid-template-columns:repeat(3,1fr);
    }

    .booking-map{
        grid-template-columns:1fr 1fr;
    }

    .sidebar{
        display:block;
    }
}



