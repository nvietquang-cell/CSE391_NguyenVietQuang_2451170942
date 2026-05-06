Câu A1:
Position static:
Vẫn chiếm chỗ trong flow?
-> Có	
Tham chiếu vị trí
->Vị trí mặc định (không dùng tọa độ)
Cuộn theo trang?
->Có
Use case
->Mặc định, không cần viết

Position relative:
Vẫn chiếm chỗ trong flow?
->Có
Tham chiếu vị trí
->Từ vị trí gốc ban đầu của nó
Cuộn theo trang?
->Có
Use case
->Làm điểm tựa (anchor) cho absolute dịch chuyển nhẹ

Position absolute
Vẫn chiếm chỗ trong flow?
->Không(bay ra khỏi flow)
Tham chiếu vị trí
->Cha gần nhất có position khác static
Cuộn theo trang
->Có(cuộn cùng vs cha của nó)
Use case
->Badge,dropdown,tooltip,overlay

Position fixed
Vẫn chiếm chỗ trong flow
->Không
Tham chiếu vị trí
->Viewport
Cuộn theo trang
->Không(luôn dính cố định 1 chỗ)
Use case
->Nút chat, thanh header cố định cookie banner

Position sticky:
Vẫn chiếm chỗ trong flow
->Có
Tham chiếu vị trí:
->Viewport
Cuộn theo trang
->Có(Chỉ dính khi cuộn đến ngưỡng thiết lập)
Use case
->Sticky header, sidebar, tiêu đề bảng

1. Khi nào absolute tham chiếu body? Khi nào tham chiếu parent?
    Tham chiếu parent: Element absolute sẽ tham chiếu vào cha (parent) nếu cha đó có thuộc tính position được thiết lập khác với giá trị static (thường người ta hay dùng position: relative để làm điểm tựa).
    Tham chiếu body (hoặc thẻ html): Nếu element absolute không tìm thấy bất kỳ thẻ cha hay tổ tiên nào có position khác static, nó sẽ tiếp tục tìm ngược lên trên cho đến tận thẻ <html> và bám vào trang (body).

2. Giải thích khái niệm "nearest positioned ancestor" (Tổ tiên được định vị gần nhất): Đây là khái niệm dùng để chỉ thẻ cha, ông nội hoặc các cấp cao hơn trong cây DOM mà có thuộc tính position khác với static (tức là có relative, absolute, fixed, hoặc sticky).
    Element absolute sẽ luôn tìm kiếm "nearest positioned ancestor" này để làm gốc tọa độ (0,0).
    Nếu thẻ cha trực tiếp là static, nó sẽ "leo" lên tiếp các cấp cao hơn để tìm cho đến khi gặp một thẻ có định vị thì dừng lại và lấy đó làm mốc tham chiếu. Nếu tìm mãi không thấy, nó mới lấy thẻ root (<html>) làm mốc cuối cùng.

Câu A2:
Trường hợp 1
flex: 1 = các item chia đều chiều ngang
4 items → 1 hàng, 4 cột bằng nhau
[ 1 ][ 2 ][ 3 ][ 4 ]
Không xuống dòng (mặc định nowrap)
Mỗi item = 25% chiều rộng

Trường hợp 2
6 items → chia:
[ 1 ][ 2 ]
[ 3 ][ 4 ]
[ 5 ][ 6 ]

Trường hợp 3
Trục ngang: giãn đều khoảng cách
Trục dọc: căn giữa
[1]        [2]        [3]
   (cùng nằm giữa theo chiều dọc)

Trường hợp 4

Layout:
[200px]   [   1fr   ]   [200px]
[ item1 ] [ item2   ] [ item3 ]

Cột giữa co giãn
Hai bên cố định 200px
Có gap 20px giữa các cột

Trường hợp 5
7 items
Chia theo hàng:
[1][2][3]
[4][5][6]
[7][ ][ ]

Câu C1:
Nguyên tắc chung:
Flexbox: dùng cho layout 1 chiều (ngang hoặc dọc)
Grid: dùng cho layout 2 chiều (hàng và cột cùng lúc)
1. Navigation bar (logo + menu + buttons)
→ Dùng: Flexbox
Giải thích:
Thanh điều hướng chỉ là một hàng ngang. Flexbox xử lý rất tốt việc căn trái – giữa – phải bằng justify-content hoặc margin: auto. Không cần tới Grid vì không có cấu trúc 2 chiều.

2. Lưới ảnh Instagram (3 cột đều, số lượng không biết)
→ Dùng: Grid
Giải thích:
Đây là layout dạng lưới nhiều hàng và cột. Grid giúp chia 3 cột đều nhau và tự động xuống hàng khi thêm ảnh mới. Flex cũng làm được nhưng sẽ phức tạp hơn và khó kiểm soát đều cột.

3. Layout blog (main content + sidebar)
→ Dùng: Grid
Giải thích:
Layout này có 2 cột rõ ràng (nội dung và sidebar). Grid phù hợp vì bạn định nghĩa trực tiếp tỷ lệ cột (ví dụ 3fr – 1fr). Ngoài ra, dễ mở rộng thêm header/footer trong cùng hệ thống layout.

4. Footer với 4 cột thông tin
→ Dùng: Grid
Giải thích:
Footer gồm nhiều cột song song. Grid giúp chia đều 4 cột, và khi responsive có thể chuyển thành 2 cột hoặc 1 cột rất dễ bằng media query. Flex làm được nhưng không trực quan bằng Grid.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút dính đáy)
→ Dùng: Flexbox
Giải thích:
Đây là layout 1 chiều theo chiều dọc. Flexbox cho phép đẩy nút xuống đáy bằng margin-top: auto, điều mà Grid không xử lý tự nhiên bằng.

Câu C2:
1. Lỗi 1: Card không đều chiều cao, nút “Mua” bị nhảy
- Mô tả lỗi
Các card có chiều cao khác nhau (do nội dung khác nhau)
Nút “Mua” không thẳng hàng:
Card ít chữ → nút nằm cao
Card nhiều chữ → nút bị đẩy xuống
- Nguyên nhân
.card là block bình thường → chiều cao phụ thuộc nội dung
Không có cơ chế căn dọc bên trong card
Nút .btn không được “ghim xuống đáy”

2. Nguyên nhân
Bạn đã bật display: flex cho .hero, nhưng flex mặc định không tự căn giữa:
justify-content mặc định = flex-start → dính trái
align-items mặc định = stretch → không căn giữa theo chiều dọc
Vì vậy .hero-content vẫn nằm ở góc trên-trái

3. Nguyên nhân
Trong flexbox:
.layout là flex container
.sidebar là flex item → mặc định có flex-shrink: 1
Khi .content quá dài hoặc chiếm nhiều không gian, trình duyệt sẽ ép sidebar nhỏ lại để nhường chỗ
Vì vậy sidebar không giữ được width 250px như bạn mong muốn.

