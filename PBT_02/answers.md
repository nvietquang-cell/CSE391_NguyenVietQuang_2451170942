Câu A1:
10 input types khác nhau trong HTML5:
1. type="email" → Giao diện là ô nhập văn bản đặc biệt, tự động kiểm tra định dạng có dấu @ → Dùng cho form đăng ký tài khoản khách hàng mới
2. type="text" → Giao diện ô nhập văn bản đơn giản, hỗ trợ validation qua các thuộc tính minlength, maxlength hoặc pattern → Dùng để khách hàng nhập họ tên hoặc địa chỉ nhận hàng
3. type="number" → Giao diện ô nhập số có kèm nút tăng/giảm, kiểm tra giới hạn giá trị qua min, max và bước nhảy step → Dùng để khách hàng chọn số lượng sản phẩm muốn bỏ vào giỏ hàng
4. type="password" → Giao diện tự động ẩn ký tự bằng dấu chấm hoặc sao để bảo mật, kiểm tra độ dài qua minlength → Dùng cho trường nhập mật khẩu khi đăng nhập hoặc thanh toán
5. type="tel" → Giao diện tối ưu để hiển thị bàn phím số trên thiết bị di động, kiểm tra định dạng số điện thoại qua pattern → Dùng để thu thập số điện thoại liên lạc khi giao hàng
6. type="date" → Hiển thị giao diện bộ chọn ngày (Date picker) trực quan, giới hạn khoảng thời gian qua min, max → Dùng để khách hàng chọn ngày dự kiến nhận hàng hoặc nhập ngày sinh để nhận mã giảm giá
7. type="url" → Giao diện ô nhập văn bản, tự động kiểm tra định dạng link bắt đầu bằng http:// → Dùng trong mục liên kết đến trang cá nhân hoặc mạng xã hội của khách hàng để xác thực
8. type="range" → Giao diện dạng thanh trượt (Slider) cho phép chọn giá trị trong khoảng từ min đến max → Dùng làm công cụ lọc sản phẩm theo tầm giá mong muốn
9. type="file" → Giao diện nút bấm để tải tệp lên, có thể giới hạn loại file qua accept hoặc cho chọn nhiều file bằng multiple → Dùng khi khách hàng cần tải ảnh feedback hoặc ảnh minh họa lỗi sản phẩm để yêu cầu đổi trả
10. type="color" → Hiển thị bảng chọn màu sắc (Color picker) chuyên nghiệp → Dùng để khách hàng chọn màu sắc tùy chỉnh cho các sản phẩm đặt làm theo yêu cầu riêng

Câu A2:
Trường hợp 1: <input type="text" required value="">
Dự đoán: Form không được gửi đi. Trình duyệt sẽ chặn lại và hiển thị thông báo lỗi yêu cầu điền vào trường này
Giải thích TẠI SAO: Thuộc tính required đánh dấu đây là trường bắt buộc. Vì người dùng để trống (value=""), trình duyệt sẽ tự động thực hiện việc kiểm tra và ngăn chặn hành động submit cho đến khi có dữ liệu được nhập
Trường hợp 2: <input type="email" value="abc">
Dự đoán: Form không được gửi đi. Trình duyệt hiển thị thông báo lỗi yêu cầu nhập đúng định dạng email (ví dụ: thiếu dấu "@")
Giải thích TẠI SAO: Khi sử dụng type="email", trình duyệt có cơ chế tự động kiểm tra định dạng email (email format).Chuỗi "abc" không thỏa mãn định dạng cơ bản của một email (phải có ký tự @), nên trình duyệt sẽ coi đây là dữ liệu không hợp lệ
Trường hợp 3: <input type="number" min="1" max="10" value="15">
Dự đoán: Form không được gửi đi. Trình duyệt báo lỗi giá trị phải nhỏ hơn hoặc bằng 10
Giải thích TẠI SAO: Loại input number hỗ trợ các thuộc tính giới hạn như min (tối thiểu) và max (tối đa). Do giá trị người dùng nhập (15) vượt quá giới hạn max="10", trình duyệt sẽ chặn submit để đảm bảo dữ liệu nằm trong khoảng cho phép
Trường hợp 4: <input type="text" pattern="{10}" value="abc123">
Dự đoán: Form không được gửi đi. Trình duyệt báo lỗi dữ liệu không khớp với định dạng yêu cầu
Giải thích TẠI SAO: Thuộc tính pattern sử dụng biểu thức chính quy để ép kiểu dữ liệu. Ở đây, định dạng {10} yêu cầu phải là đúng 10 chữ số. Giá trị "abc123" vừa chứa chữ cái, vừa sai độ dài, nên sẽ bị trình duyệt từ chối
Trường hợp 5: <input type="password" minlength="8" value="123">
Dự đoán: Form không được gửi đi. Trình duyệt yêu cầu người dùng nhập chuỗi dài hơn (ít nhất 8 ký tự)
Giải thích TẠI SAO: Với trường password, thuộc tính minlength quy định độ dài tối thiểu của chuỗi. Vì "123" chỉ có 3 ký tự, không đạt mức tối thiểu là 8, trình duyệt sẽ tự động kích hoạt thông báo lỗi "miễn phí" mà không cần dùng đến JavaScript

Câu A3:
1. Tại sao <label for="email"> quan trọng cho người dùng screen reader?
Theo nguồn tài liệu, nếu một form không có thẻ <label>, người dùng sử dụng trình đọc màn hình (screen reader) sẽ không biết ô nhập liệu đó dùng để làm gì
Liên kết logic: Thuộc tính for trong thẻ <label> phải khớp với id của thẻ <input>. Điều này tạo ra một mối liên kết chặt chẽ về mặt lập trình
Trải nghiệm người dùng: Khi người dùng khiếm thị điều hướng (tab) đến ô input, trình đọc màn hình sẽ đọc nội dung văn bản bên trong thẻ <label> tương ứng (ví dụ: "Email"). Nếu thiếu nhãn này, máy chỉ báo đó là một "ô nhập văn bản" trống rỗng, khiến người dùng gặp khó khăn trong việc điền thông tin
Tiêu chuẩn bắt buộc: Tài liệu nhấn mạnh rằng khả năng tiếp cận (Accessibility) là yêu cầu bắt buộc tại các công ty lớn như Apple và Google
2. Khi nào dùng <fieldset> + <legend>?
Khi nào dùng: Cặp thẻ này được dùng để nhóm các phần tử có liên quan lại với nhau trong một form lớn, giúp bố cục rõ ràng và cải thiện khả năng tiếp cận bằng cách cung cấp ngữ cảnh cho cả nhóm.
<fieldset>: Dùng để bao quanh một nhóm các input liên quan.
<legend>: Đóng vai trò là tiêu đề cho nhóm đó
3. aria-label và tại sao không nên dùng chung với <label>?
aria-label dùng khi nào? Nó được dùng khi bạn muốn cung cấp một nhãn mô tả cho các công cụ hỗ trợ (như screen reader) nhưng không muốn hiển thị nhãn đó bằng văn bản trên giao diện người dùng.
Ví dụ: Một nút bấm tìm kiếm chỉ có icon hình kính lúp mà không có chữ "Tìm kiếm". Bạn sẽ thêm aria-label="Tìm kiếm" vào nút đó để người khiếm thị biết chức năng của nút.
Tại sao KHÔNG nên dùng aria-label khi đã có <label>?
Gây nhiễu (Redundancy): Nếu bạn dùng cả hai, trình đọc màn hình có thể đọc lặp lại thông tin hoặc bị ưu tiên đè lên nhau (thường aria-label sẽ đè lên nội dung của <label>), dẫn đến sự khó hiểu cho người dùng.
Ưu tiên <label> chuẩn: Thẻ <label> truyền thống luôn là giải pháp tốt nhất vì nó vừa hỗ trợ Accessibility, vừa cho phép người dùng bình thường click vào chữ để tập trung (focus) vào ô nhập liệu (tăng diện tích tương tác), điều mà aria-label không làm được.

Câu A4:
1. Thuộc tính loading="lazy" trên thẻ <img>
Giải thích: Đây là thuộc tính hướng dẫn trình duyệt trì hoãn việc tải hình ảnh cho đến khi người dùng cuộn trang đến gần vị trí của ảnh đó (lazy loading).
Cải thiện: Giúp tăng tốc độ tải trang ban đầu, giảm băng thông dữ liệu và tiết kiệm tài nguyên hệ thống, đặc biệt là trên các thiết bị di động.
Khi nào KHÔNG nên dùng: Không nên dùng cho các hình ảnh ở phần đầu trang (Above the Fold) – những ảnh mà người dùng sẽ thấy ngay khi vừa mở trang. Việc dùng lazy ở đây sẽ khiến ảnh hiện ra chậm hơn, làm giảm trải nghiệm người dùng (LCP - Largest Contentful Paint).
2. Thẻ <video> và nhiều thẻ <source>
Tại sao nên cung cấp nhiều <source>: Vì các trình duyệt khác nhau hỗ trợ các định dạng mã hóa video (codecs) khác nhau. Cung cấp nhiều lựa chọn giúp đảm bảo video có thể chạy được trên mọi trình duyệt (nếu trình duyệt không hỗ trợ format đầu tiên, nó sẽ tự động thử format tiếp theo).
3 format video web phổ biến:
MP4 (H.264) - Độ tương thích cao nhất hiện nay.
WebM - Dung lượng nhẹ, chất lượng cao, tối ưu cho web.
Ogg/Theora - Định dạng mã nguồn mở.
3. Thuộc tính alt trên thẻ <img>
Dựa trên nguyên tắc về Accessibility (Khả năng tiếp cận) trong nguồn tài liệu, thuộc tính alt (alternative text) dùng để mô tả nội dung hình ảnh cho trình đọc màn hình (screen reader) và hiển thị văn bản thay thế nếu ảnh bị lỗi không tải được. Việc đảm bảo tính tiếp cận này là yêu cầu bắt buộc tại các công ty lớn như Apple và Google
Viết alt tốt cho 3 trường hợp:
Ảnh sản phẩm iPhone 16: alt="Điện thoại iPhone 16 phiên bản màu Titan Sa mạc, góc nhìn từ mặt lưng và cụm camera" (Mô tả rõ ràng sản phẩm).
Ảnh trang trí (decorative): alt="" (Để trống chuỗi văn bản để trình đọc màn hình bỏ qua, tránh làm phiền người dùng với các thông tin không quan trọng).
Ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột doanh thu quý 1 năm 2026, cho thấy mức tăng trưởng 15% so với cùng kỳ năm trước với tổng doanh thu đạt 50 tỷ đồng" (Tóm tắt được thông tin cốt lõi của biểu đồ).

Câu A5:
1. So sánh tổng quan:
Cách 1: Chỉ dùng <img>
Mục đích: Chèn một hình ảnh đơn thuần vào trang web.
Tính tiếp cận: Dựa hoàn toàn vào thuộc tính alt để mô tả cho trình đọc màn hình
Hiển thị: Chỉ có ảnh (và văn bản thay thế nếu ảnh lỗi).
Cách 2: Dùng <figure> + <figcaption>
Mục đích: Nhóm hình ảnh và chú thích thành một khối nội dung có ý nghĩa ngữ nghĩa (semantic).
Tính tiếp cận: Kết hợp cả alt và nội dung hiển thị trong <figcaption> để cung cấp ngữ cảnh đầy đủ nhất.
Hiển thị: Có cả ảnh và phần mô tả văn bản đi kèm bên dưới hoặc bên trên.
2. Khi nào dùng Cách 1?
Dùng khi hình ảnh chỉ mang tính chất minh họa, bổ trợ cho nội dung xung quanh hoặc là các thành phần giao diện nhỏ không cần giải thích thêm bằng văn bản hiển thị.
Ví dụ 1: Logo công ty trên thanh Header. Người dùng chỉ cần nhìn là biết, hoặc trình đọc màn hình sẽ đọc qua alt. Không ai để chú thích "Đây là logo" ngay dưới logo.
Ví dụ 2: Các icon tính năng. Ví dụ icon hình chiếc xe tải bên cạnh dòng chữ "Giao hàng nhanh". Icon này chỉ để làm đẹp và bổ trợ cho văn bản đã có sẵn.
3. Khi nào dùng Cách 2?
Dùng khi hình ảnh là một thành phần nội dung quan trọng, cần có chú thích đi kèm để người dùng hiểu rõ thông tin chi tiết (như giá cả, tên mã, nguồn gốc). Cách này tuân thủ tốt nguyên tắc Accessibility — Form cho mọi người vì nó tạo ra mối liên kết rõ ràng giữa hình ảnh và mô tả
Ví dụ 1: Danh mục sản phẩm (E-commerce). Như ví dụ của bạn, ảnh iPhone cần đi kèm tên chính xác và giá tiền ngay bên dưới để khách hàng đưa ra quyết định mua sắm.
Ví dụ 2: Ảnh tư liệu hoặc Biểu đồ trong bài viết. Một biểu đồ doanh thu cần thẻ <figcaption> để ghi "Biểu đồ 1: Tăng trưởng doanh thu Q1/2026" giúp người đọc (và cả các công cụ tìm kiếm) hiểu nội dung của bức ảnh đó là gì.

Câu C1:
Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility khiến trình đọc màn hình không nhận diện được mục đích ô nhập liệu. Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>
Lỗi 2: Dòng 4 — Input "Email" sử dụng placeholder thay cho nhãn dán, đồng thời thiếu thuộc tính required để kích hoạt validation "miễn phí". Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>
Lỗi 3: Dòng 6 — Input "Mật khẩu" thiếu thuộc tính minlength để đảm bảo mật khẩu có độ dài an toàn theo yêu cầu "mật khẩu mạnh". Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" minlength="8" required>
Lỗi 4: Dòng 9 — Input "Phone" đang dùng type="text", không tối ưu giao diện bàn phím số trên thiết bị di động. Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="{10}" required>
Lỗi 5: Dòng 11 — Thẻ <select> thiếu nhãn định danh và các <option> thiếu thuộc tính value, dẫn đến việc không gửi được dữ liệu chính xác lên server. Sửa: <label for="city">Thành phố:</label> <select id="city" name="city"> <option value="hn">Hà Nội</option> <option value="hcm">TP.HCM</option> </select>
Lỗi 6: Dòng 16 — Phần "Đồng ý điều khoản" thiếu thẻ <input type="checkbox"> và thuộc tính for trong <label> để tạo liên kết logic. Sửa: <input type="checkbox" id="tos" name="tos" required> <label for="tos">Tôi đồng ý điều khoản</label>
Lỗi 7: Dòng 1 — Thẻ <form> thiếu thuộc tính action và method, khiến trình duyệt không biết gửi dữ liệu đi đâu và gửi như thế nào khi nhấn Submit. Sửa: <form action="/register" method="POST">
Lỗi 8: Tất cả các Input — Thiếu thuộc tính name. Nếu không có name, dữ liệu trong các ô nhập liệu sẽ không được định danh khi gửi lên server. Sửa: Đảm bảo mỗi thẻ <input>, <select> đều có thuộc tính name duy nhất (ví dụ:name="username", name="email").

Câu C2:
1. Viết pattern regex cho CMND/CCCD và Số tài khoản
Sử dụng thuộc tính pattern để kiểm tra dữ liệu bằng biểu thức chính quy (regex)
CMND/CCCD (đúng 12 chữ số): pattern="{12}" hoặc pattern="\d{12}" (Giải thích: Chỉ chấp nhận các chữ số từ 0-9 và phải có độ dài chính xác là 12 ký tự).
Số tài khoản (từ 10 đến 15 chữ số): pattern="{10,15}" hoặc pattern="\d{10,15}" (Giải thích: Chấp nhận các chữ số với độ dài tối thiểu là 10 và tối đa là 15).
Mã PIN (6 chữ số, không hiển thị): Sử dụng type="password" để ẩn ký tựvà pattern="{6}" để giới hạn độ dài.
2. HTML5 validation đã đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
Trả lời: KHÔNG đủ an toàn.
Tại sao:
Dễ bị vượt qua: HTML5 validation chỉ diễn ra ở phía Client (trình duyệt). Người dùng có thể dễ dàng dùng công cụ Inspect Element (F12) để xóa bỏ các thuộc tính như required hoặc pattern trước khi gửi form.
Không chống được công cụ bên ngoài: Các hacker có thể gửi dữ liệu trực tiếp đến server thông qua các công cụ như Postman hoặc script mà không cần thông qua giao diện trình duyệt, khiến mọi lớp bảo vệ của HTML5 trở nên vô hiệu.
Chỉ là bước lọc đầu tiên: Theo tài liệu, HTML5 validation chỉ là giải pháp "miễn phí" giúp cải thiện trải nghiệm người dùng bằng cách báo lỗi sớm. Đối với các hệ thống yêu cầu bảo mật cực cao như ngân hàng, đây chỉ được coi là lớp hỗ trợ giao diện (UI/UX).
3. 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)
Dưới đây là 3 ví dụ điển hình:
So khớp dữ liệu (Cross-field validation): Ví dụ: Kiểm tra xem ô "Nhập lại mật khẩu" có trùng khớp với ô "Mật khẩu" hay không.
Kiểm tra tính duy nhất (Real-time availability): Kiểm tra xem số CMND hoặc Email đã tồn tại trong hệ thống ngân hàng chưa thông qua việc gọi API đến database.
Logic điều kiện phức tạp: Ví dụ: Nếu người dùng chọn quốc tịch "Nước ngoài" thì mới yêu cầu nhập số Hộ chiếu, còn nếu là "Việt Nam" thì yêu cầu CCCD.
4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend:
Dữ liệu rác và sai định dạng phá hủy cơ sở dữ liệu: Nếu không validate ở Backend, các giá trị không hợp lệ (như chữ cái trong trường số dư, hoặc chuỗi quá dài) có thể được lưu vào database, gây lỗi hệ thống hoặc làm sai lệch báo cáo tài chính.
Tấn công tiêm nhiễm (Injection Attacks): Kẻ tấn công có thể chèn các mã độc (SQL Injection) vào các ô nhập liệu. Nếu Backend không kiểm tra và làm sạch dữ liệu mà tin tưởng hoàn toàn vào lớp Frontend, toàn bộ dữ liệu ngân hàng có thể bị đánh cắp hoặc xóa sạch.