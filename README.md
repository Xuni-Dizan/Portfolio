# Website Cá Nhân Đẳng Cấp và Độc Đáo

Đây là dự án website cá nhân được thiết kế với phong cách chuyên nghiệp kết hợp nghệ thuật, tập trung vào việc thể hiện bản sắc cá nhân một cách mạnh mẽ và độc đáo. Mục tiêu là tạo ra một trải nghiệm người dùng mượt mà, ấn tượng và sang trọng.

## Công Nghệ Sử Dụng

- **Front-end:** ReactJS (với Create React App hoặc Vite), HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **Animation:** GSAP (GreenSock Animation Platform)
- **Fonts:** Google Fonts (Abril Fatface, Montserrat, Merriweather, Playfair Display, Ms Madi)
- **Deployment (Đề xuất):** Vercel, Netlify

## Cài Đặt và Khởi Chạy

Để khởi chạy dự án này trên máy cục bộ của bạn, hãy làm theo các bước sau:

1.  **Clone Repository:**
    ```bash
    git clone <URL_REPOSITORY_CUA_BAN>
    cd ten-thu-muc-du-an
    ```

2.  **Cài đặt Dependencies:**
    Sử dụng `npm` hoặc `yarn` để cài đặt các thư viện cần thiết được định nghĩa trong `package.json`.
    ```bash
    npm install
    # hoặc
    yarn install
    ```

3.  **Khởi chạy Development Server:**
    Sau khi cài đặt xong, bạn có thể khởi chạy server phát triển:
    ```bash
    npm start
    # hoặc
    yarn start
    ```
    Thao tác này sẽ mở website trên trình duyệt của bạn, thường là tại địa chỉ `http://localhost:3000`. Trang web sẽ tự động tải lại nếu bạn thực hiện thay đổi trong mã nguồn.

4.  **Build Dự Án cho Production:**
    Để tạo một bản build tối ưu cho việc triển khai (deploy) lên server:
    ```bash
    npm run build
    # hoặc
    yarn build
    ```
    Các file đã build sẽ nằm trong thư mục `build/` (hoặc `dist/` nếu dùng Vite).

## Cấu Trúc Thư Mục (Tổng quan)


your-personal-website/
├── public/              # Chứa file HTML gốc và các tài sản tĩnh
│   ├── index.html
│   ├── favicon.ico        # Icon của website trên tab trình duyệt
│   └── ...                # Các tài sản tĩnh khác (ảnh, video nếu không import trực tiếp)
├── src/                 # Chứa mã nguồn React
│   ├── components/      # Thư mục chứa các UI components tái sử dụng
│   │   ├── HeroSection.js
│   │   ├── AboutSection.js
│   │   ├── PortfolioSection.js
│   │   ├── BlogSection.js
│   │   ├── TestimonialsSection.js
│   │   ├── ContactSection.js
│   │   └── ...  
│   ├── assets/          # Hình ảnh, fonts (nếu không dùng CDN), SVGs
│   │   ├── images/
│   │   ├── videos/        # (Nếu bạn muốn quản lý video tại đây)
│   │   └── fonts/
│   ├── styles/            # (Tùy chọn) Thư mục chứa các file CSS/SCSS toàn cục
│   │   └── global.css     # (Nếu bạn dùng CSS Modules hoặc SCSS riêng)
│   ├── App.js           # Component chính của ứng dụng
│   ├── index.css        # File CSS toàn cục (bao gồm Tailwind directives)
│   └── index.js         # Điểm vào của ứng dụng React
├── .gitignore
├── package.json
└── README.md


## Fonts và Animation

-   **Fonts:** Các font chữ (Abril Fatface, Montserrat, Merriweather, Playfair Display, Ms Madi) được nhúng từ Google Fonts trong file `public/index.html`.
-   **Animation:** GSAP và ScrollTrigger được tải thông qua CDN. Logic tải và kiểm tra được xử lý trong component `App.js`.

## Điểm Nhấn Cá Nhân

Website này được thiết kế để:
-   Thể hiện rõ nét bạn là ai, chuyên môn nổi bật và sự sáng tạo cá nhân.
-   Không chỉ trình bày thông tin mà còn là nơi người dùng có thể "gặp gỡ và cảm nhận" con người bạn qua thiết kế và tương tác.

---

Cảm ơn bạn đã xem qua dự án này!
