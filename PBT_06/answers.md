## Track A — Bootstrap 

### A1 — Grid System (ví dụ code trong đề)
- < 768px: mỗi `div` có `col-12` → mỗi box chiếm 12 cột → hiển thị 1 cột (Box 1..4 xếp dọc).
- 768px - 991px: `col-md-6` áp dụng → mỗi box chiếm 6/12 → 2 cột (Box 1-2 trên hàng 1, Box 3-4 hàng 2).
- ≥ 992px: `col-lg-3` áp dụng → mỗi box chiếm 3/12 → 4 cột (1 hàng, 4 box).

Giải thích: `col-md-6` nghĩa là từ breakpoint `md` (≥768px) trở lên, cột sẽ chiếm 6/12 = 50% chiều ngang. Không cần `col-sm-12` vì `col-12` đã phủ cho mọi kích thước nhỏ hơn breakpoint `md`.

### A2 — Utilities & Components
1. `d-none d-md-block` → ẩn (display:none) trên mọi màn hình nhỏ; từ `md` (≥768px) trở lên hiển thị block.
2. Spacing utilities: `mt-3` (margin-top), `mb-2` (margin-bottom), `px-4` (padding-left/right), `py-1` (padding top/bottom), `ms-auto` (margin-left auto). Các giá trị là hệ thang của Bootstrap.
3. `.container` có max-width responsive; `.container-fluid` luôn 100% full-width; `.container-md` behaves like container but becomes fixed-width starting at `md` breakpoint.

### C1 — Tùy biến `$primary` (Sass)
1. Cách làm: cài Sass + lấy source SCSS của Bootstrap, thay `$primary: #E63946` trong file `_variables.scss` của Bootstrap hoặc trong file overrides trước khi import `bootstrap.scss`, rồi build CSS bằng Sass.
2. Vì sao không override `.btn-primary` trực tiếp: dùng biến giúp các component nhận màu mới trên toàn hệ thống, tránh lặp và đảm bảo consistency khi Bootstrap được cập nhật.

### C2 — So sánh CSS thuần vs Bootstrap (tóm tắt)
- CSS thuần: nhiều dòng để viết layout, responsive, và components; thời gian phát triển lâu hơn.
- Bootstrap: viết nhanh bằng class, reusable components, ít code custom.
- Khi dùng: dùng Bootstrap nếu cần prototype nhanh, consistency; tránh khi cần UI hoàn toàn custom hoặc performance-critical tiny CSS.

---

## Track B — Tailwind 

### A1 — Utility classes (ví dụ)
- `flex` → display:flex
- `items-center` → align-items: center
- `justify-between` → justify-content: space-between
- `p-4` → padding: 1rem
- `bg-white` → background-color: white
- `shadow-md` → box-shadow medium
- `rounded-lg` → border-radius
- `hover:shadow-xl` → trên hover áp dụng shadow-xl
- `transition-shadow duration-300` → transition cho shadow, thời gian 300ms
- `w-16 h-16` → width/height 4rem (64px)
- `rounded-full` → border-radius:9999px
- `object-cover` → object-fit: cover
- `ml-4 flex-1` → margin-left + flex:1 (chiếm còn lại)
- `text-lg font-semibold` → kích thước chữ + font-weight
- `truncate` → rút ngắn văn bản bằng dấu 3 chấm

### A2 — Responsive & States
1. `md:` prefix: áp dụng từ breakpoint md (≥768px). `md:grid-cols-2 lg:grid-cols-4` nghĩa là: mặc định 1 cột, md → 2 cột, lg → 4 cột.
2. State modifiers: `hover:` áp dụng trên hover, `focus:` trên focus, `active:` khi active, `group-hover:` khi parent có class `group` và đang hover.
3. Ẩn mobile, hiện flex trên tablet: `hidden md:flex` (tương đương `d-none d-md-flex`).

### C1 — So sánh Tailwind vs CSS thuần
- Tailwind: HTML dài hơn vì nhiều utility classes; nhưng không cần file CSS lớn. Reusability thông qua components hoặc `@apply`.
- CSS thuần: CSS file có thể dài; HTML ngắn hơn nhưng maintenance có thể phức tạp.

### C2 — Performance
1. Tailwind cuối cùng nhỏ hơn vì Purge/JIT loại bỏ classes không dùng, chỉ giữ CSS thực sự dùng trong project.
2. PurgeCSS/Tailwind JIT loại bỏ utility classes không xuất hiện trong HTML/JS, giảm size CSS.
3. Trường hợp không dùng Tailwind: (a) khi team yêu cầu design system hoàn toàn custom, (b) khi muốn HTML cực kỳ sạch, không nhiều classes inline.

