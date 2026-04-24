Câu A1:
Các bước xảy ra gồm:
1.Gửi yêu cầu (Request) và Tìm kiếm địa chỉ: Trình duyệt gửi yêu cầu từ thiết bị của bạn, đi qua router WiFi và hạ tầng nhà mạng (ISP), rồi vượt qua các tuyến cáp quang để tìm đến máy chủ (Server) của Shopee

2.Phản hồi từ máy chủ (Server Response): Máy chủ nhận yêu cầu và gửi phản hồi về cho trình duyệt, bao gồm các tệp tin cốt lõi là HTML, CSS và JavaScript

3.Phân tích dữ liệu (Parse): Trình duyệt nhận các tệp tin và bắt đầu quá trình phân tích: đầu tiên là Parse HTML để xây dựng cấu trúc (bộ xương), sau đó là Parse CSS để xác định giao diện (màu sắc, bố cục)

4.Thực thi mã tương tác (Execute JS): Trình duyệt thực thi các đoạn mã JavaScript để xử lý các hành vi và tính tương tác của trang web

5.Hiển thị giao diện (Layout & Paint): Cuối cùng, trình duyệt thực hiện bước Layout (tính toán vị trí các phần tử) và Paint (vẽ các điểm ảnh lên màn hình) để hiển thị hoàn chỉnh trang web Shopee cho bạn thấy

b) Tab network trong devtool của Chrome cho ta thấy:

- Danh sách các request
- Chi tiết các thông tin của 1 request
- Các tài nguyên được gửi về (CSS,JS, IMG, FONT, etc)

Câu A2:
1. Các lỗi Semantic chính
Sử dụng <div> cho các thành phần cấu trúc lớn: Thay vì dùng <div class="header">, <div class="main">, và <div class="footer">, bạn nên dùng các thẻ chuyên biệt là <header>, <main>, và <footer> để trình duyệt và công cụ tìm kiếm nhận diện được bố cục trang web

Thiếu thẻ điều hướng <nav>: Menu trang web đang được bọc trong <div>. Đúng ra phải dùng thẻ <nav> để đánh dấu đây là khu vực chứa các liên kết điều hướng chính

Sản phẩm không được đặt trong thẻ <article>: Một sản phẩm là một nội dung độc lập, có thể đứng riêng biệt. Tài liệu hướng dẫn nên dùng thẻ <article> cho các đối tượng như bài viết hoặc sản phẩm thay vì <div>

Dùng <div> cho tiêu đề thay vì thẻ Heading: Tên sản phẩm "iPhone 16 Pro" đang dùng thẻ <div>. Để SEO tốt, các tiêu đề phải dùng thẻ từ <h1> đến <h6> để phân cấp nội dung

Thẻ <img> thiếu thuộc tính alt: Đây là lỗi nghiêm trọng cho SEO và khả năng tiếp cận (Accessibility). Thuộc tính alt cần mô tả nội dung ảnh để Google có thể "đọc" được ảnh đó là gì

Câu A3:
Kết quả hiển thị
<pre>
--------------------------------
|Hộp 1                         |
|Text A Text B                 |
|Hộp 2                         |
|Text C <strong>Text D</strong>                 |
|Hộp 3                         |
|                              |
|                              |
|                              |
--------------------------------
</pre>
 Giải thích
 + đối với các thẻ như ```<div>``` thì render ra trên browser text trong các thẻ sẽ xuống dòng vì vậy các nội dung như Hộp 1, Hộp 2 và Hộp 3 mới ở mỗi cái một dòng, tương tự với nội dung được bao bọng trong các thẻ đó

+ đối với các thẻ như ```<span>``` thì thẻ này hoàn toàn có thể render trên cùng 1 dòng với các thẻ nội dung khác như vì vậy các nội dung như "Text A", "Text B" mới có thể đứng cùng 1 dòng

+ đối với thẻ ```<strong>``` thẻ này render tương tự như thẻ ```<span>``` có thể ở cùng dòng với các nội dung khác nhưng thẻ này có nhiệm vụ in đậm text bên trong và nói cho browser biết đây là nội dung cần được chú ý.Phần A

Câu A4:
Sự khác nhau giữa các thẻ ```<thead>```, ```<tbody>```, ```<tfoot>```
+ ```<thead>```: dùng để thể hiện tiêu đề của bảng, thường chỉ được dùng 1 lần để ghi nội dung tiêu đề
+ ```<tfoot>```: dùng để thể hiện các dòng tổng kết các dữ liệu trong bảng (tổng tiền, tổng sinh viên, etc), thường xuất hiện ở dưới cùng của bảng
+ ```<tbody>```: dùng để chứa nội dung chính của bảng, có thể được dùng nhiều lần trong 1 bảng để chia dữ liệu thành các nhóm

Việc không sử dụng ```<table>``` để làm layout trang web là một quy tắc, bởi sử dụng bảng để làm layout website sẽ đem đến các hậu quả sau:
1. Browser hiện đại sẽ hiểu cả trang web của chúng ta là cả 1 cái bảng không lồ, nó sẽ không biết đâu là thanh điều hướng , đâu là tiêu đề, etc. Dẫn tới đánh giá SEO thấp
2. Cực kì khó để trang web có thể đáp ứng trên đa nền tảng(mobile, desktop), bởi bảng là thiết kế cấu trúc dạng hàng và cột vì vậy những hàng và cột hiển thị trên màn hình máy tính lại rất khó để có thể thiết kế chúng xếp trồng lên nhau để hiển thị trên một thiết bị màn hình nhỏ như điện thoại
3. Tốc độ tải trang chậm bởi trang web phải đợi tất cả dữ liệu trong bảng được tải trước khi có thể hiện thị lên cho người dùng

Câu C1:
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Chi tiết sản phẩm</title>
</head>
<body>

    <!-- Header: dùng header vì đây là phần đầu trang -->
    <header>
        <h1>Logo / Tên website</h1>

        <!-- Navigation: dùng nav vì đây là menu điều hướng chính -->
        <nav>
            <ul> <!-- ul vì menu không cần thứ tự -->
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Danh mục</a></li>
                <li><a href="#">Liên hệ</a></li>
            </ul>
        </nav>
    </header>

    <!-- Main: chứa nội dung chính của trang -->
    <main>

        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb"> <!-- nav vì đây là điều hướng -->
            <ol> <!-- ol vì breadcrumb có thứ tự -->
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Điện thoại</a></li>
                <li>iPhone 16</li>
            </ol>
        </nav>

        <!-- Layout chính -->
        <section> <!-- section để nhóm nội dung sản phẩm -->

            <!-- Khu vực ảnh -->
            <section> <!-- section vì đây là 1 phần riêng -->
                <h2>Hình ảnh sản phẩm</h2>

                <!-- figure dùng cho ảnh + mô tả -->
                <figure>
                    <img src="img1.jpg" alt="Ảnh 1" loading="lazy"> <!-- lazy để tối ưu tải -->
                    <figcaption>Ảnh 1</figcaption>
                </figure>

                <figure>
                    <img src="img2.jpg" alt="Ảnh 2" loading="lazy">
                    <figcaption>Ảnh 2</figcaption>
                </figure>

                <figure>
                    <img src="img3.jpg" alt="Ảnh 3" loading="lazy">
                    <figcaption>Ảnh 3</figcaption>
                </figure>

                <figure>
                    <img src="img4.jpg" alt="Ảnh 4" loading="lazy">
                    <figcaption>Ảnh 4</figcaption>
                </figure>

                <figure>
                    <img src="img5.jpg" alt="Ảnh 5" loading="lazy">
                    <figcaption>Ảnh 5</figcaption>
                </figure>
            </section>

            <!-- Thông tin sản phẩm -->
            <article> <!-- article vì nội dung này độc lập -->
                <h2>Tên sản phẩm</h2>

                <p>Giá: ...</p>

                <!-- đánh giá sao -->
                <p>⭐⭐⭐⭐⭐</p>

                <!-- mô tả -->
                <section>
                    <h3>Mô tả</h3>
                    <p>Mô tả sản phẩm...</p>
                </section>
            </article>

            <!-- Bảng thông số -->
            <section>
                <h2>Thông số kỹ thuật</h2>

                <!-- table vì dữ liệu dạng bảng -->
                <table>
                    <thead>
                        <tr>
                            <th>Thông số</th>
                            <th>Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Màn hình</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>Pin</td>
                            <td>...</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <!-- Đánh giá / bình luận -->
            <section>
                <h2>Đánh giá</h2>

                <!-- mỗi comment là 1 article -->
                <article>
                    <p>Người dùng A</p>
                    <p>Sản phẩm tốt</p>
                </article>

                <article>
                    <p>Người dùng B</p>
                    <p>Ổn trong tầm giá</p>
                </article>
            </section>

        </section>

        <!-- Sidebar -->
        <aside> <!-- aside vì nội dung phụ -->
            <h2>Sản phẩm tương tự</h2>

            <ul>
                <li><a href="#">Sản phẩm 1</a></li>
                <li><a href="#">Sản phẩm 2</a></li>
            </ul>
        </aside>

    </main>

    <!-- Footer -->
    <footer> <!-- footer vì đây là phần cuối trang -->
        <p>© 2026 Website</p>
    </footer>

</body>
</html>

Câu C2:
Việc dùng `<div>` cho mọi thứ rồi gắn class có thể giúp code nhanh lúc đầu, nhưng về lâu dài lại gây nhiều hạn chế rõ rệt. Trước hết, về SEO, các công cụ tìm kiếm như Google ưu tiên cấu trúc HTML có ngữ nghĩa vì nó giúp hiểu nội dung trang tốt hơn. Ví dụ, khi dùng `<article>` cho một sản phẩm hoặc bài viết, công cụ tìm kiếm có thể xác định đó là nội dung chính, từ đó cải thiện khả năng xếp hạng. Nếu tất cả đều là `<div>`, ý nghĩa này bị mất đi.

Thứ hai là Accessibility (khả năng truy cập). Các công cụ hỗ trợ như screen reader dựa vào thẻ semantic như `<nav>`, `<header>`, `<main>` để giúp người khiếm thị điều hướng nhanh giữa các phần của trang. Nếu chỉ dùng `<div>`, người dùng phải nghe toàn bộ nội dung mà không biết đâu là menu hay nội dung chính, làm trải nghiệm kém đi đáng kể.

Ví dụ cụ thể: một trang có breadcrumb. Khi dùng `<nav aria-label="breadcrumb">` kết hợp với `<ol>`, screen reader có thể thông báo rõ đây là đường dẫn điều hướng. Nếu chỉ dùng `<div>`, thông tin này không được truyền tải đúng.

Tuy nhiên, `<div>` vẫn rất hữu ích trong các trường hợp không mang ý nghĩa ngữ nghĩa, như dùng để chia layout, bọc các phần tử để áp dụng CSS hoặc JavaScript. Vì vậy, thay vì loại bỏ `<div>`, nên sử dụng kết hợp: semantic HTML cho cấu trúc và `<div>` cho mục đích trình bày.

Bài 4:
1. Semantic HTML5
Các thẻ semantic được sử dụng
<header>
Vị trí: Phần đầu trang
Nội dung: chứa logo, thanh tìm kiếm, menu người dùng
<nav>
Vị trí: ngay dưới header
Nội dung: danh mục sản phẩm (điện thoại, sách, gia dụng, ...)
<main>
Vị trí: phần nội dung chính của trang
Nội dung: hiển thị sản phẩm, banner quảng cáo

2. Trang tiki theo em tìm hiểu trên trang chủ thì không sử dụng table 

3. Form trên trang
Form tìm kiếm
Vị trí: thanh tìm kiếm ở header
Thuộc tính form
action: /search
method: GET