# Cyber Community

Cyber Community là dự án mạng xã hội gồm hai ứng dụng độc lập:

- `frontend`: React 19 SPA, Vite, React Router, Mantine, TanStack Query, Redux Toolkit, Zustand và Socket.IO Client.
- `backend`: Node.js, Express 5, MySQL, Prisma, Sequelize, JWT, Socket.IO, GraphQL và Swagger.

## Tổng quan nhanh

| Thành phần | Công nghệ chính | Cổng local | Địa chỉ mặc định |
|---|---|---:|---|
| Frontend | React 19 + Vite | `3000` | `http://localhost:3000` |
| Backend | Express 5 + Socket.IO | `3069` | `http://localhost:3069` |
| REST API | Express Router | `3069` | `http://localhost:3069/api` |
| Swagger UI | swagger-ui-express | `3069` | `http://localhost:3069/api/docs` |
| GraphQL | graphql-http | `3069` | `http://localhost:3069/graphql` |
| Ruru IDE | Ruru | `3069` | `http://localhost:3069/ruru` |
| Database | MySQL | Theo cấu hình | Khai báo bằng `DATABASE_URL` |

```mermaid
flowchart LR
    U["Trình duyệt"] -->|"HTTP :3000"| FE["React + Vite"]
    FE -->|"REST /api"| BE["Express :3069"]
    FE <-->|"WebSocket"| IO["Socket.IO"]
    BE --> IO
    BE -->|"Prisma / Sequelize"| DB[("MySQL")]
    BE --> CL["Cloudinary"]
    BE --> GG["Google OAuth"]
```

## Chức năng chính

| Nhóm | Chức năng |
|---|---|
| Tài khoản | Đăng ký, đăng nhập, refresh token, lấy thông tin người dùng |
| Google OAuth | Đăng nhập và callback bằng Google |
| Người dùng | Danh sách, chi tiết, chỉnh sửa, tải avatar local hoặc Cloudinary |
| Bài viết | Tạo, xem danh sách, xem chi tiết, cập nhật và xóa |
| Phân quyền | Quản lý role, trạng thái role và kiểm tra permission |
| Trò chuyện | Nhóm chat, tin nhắn và cập nhật thời gian thực bằng Socket.IO |
| API tooling | Swagger UI, GraphQL endpoint và Ruru IDE |
| Giao diện | Responsive UI, theme, đa ngôn ngữ và trang quản trị |

## Cấu trúc thư mục

```text
cyber_community/
├── frontend/                 # React SPA
│   ├── public/               # Ảnh và static assets
│   ├── messages/             # Từ điển en/vi
│   ├── src/
│   │   ├── api/              # API client, actions, TanStack Query hooks
│   │   ├── components/       # Component dùng lại
│   │   ├── constant/         # Route, endpoint và app constants
│   │   ├── hooks/            # Custom React hooks
│   │   ├── i18n/             # Provider và cấu hình ngôn ngữ
│   │   ├── layouts/          # Auth, client và admin layouts
│   │   ├── page/             # Nội dung các màn hình
│   │   ├── redux/            # Redux store và slices
│   │   ├── stores/           # Zustand stores
│   │   ├── styles/           # Global styles và animation
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx           # Khai báo React Router
│   │   └── main.tsx          # Entry point và providers
│   ├── Dockerfile            # Build Vite và phục vụ bằng Nginx
│   ├── nginx.conf            # SPA fallback và cache static assets
│   └── vite.config.ts        # Cấu hình Vite
├── backend/                  # REST, GraphQL và Socket server
│   ├── prisma/               # Prisma schema
│   ├── public/               # Static files và ảnh upload local
│   ├── src/
│   │   ├── common/           # Middleware, auth, DB, Swagger, GraphQL, Socket
│   │   ├── controllers/      # HTTP controllers
│   │   ├── models/           # Sequelize models
│   │   ├── routers/          # Express routers
│   │   └── services/         # Business logic và data access
│   └── server.js             # Backend entry point
└── README.md                 # Tài liệu tổng của dự án
```

## Yêu cầu hệ thống

| Công cụ | Khuyến nghị |
|---|---|
| Node.js | `20.x` trở lên |
| npm | Đi kèm Node.js |
| MySQL | MySQL 8 hoặc phiên bản tương thích |
| Git | Phiên bản hiện hành |
| Docker | Tùy chọn, hiện dùng cho frontend production image |

## Cài đặt và chạy local

### 1. Chuẩn bị backend

Di chuyển vào backend và cài dependency:

```bash
cd backend
npm install
```

Tạo file `backend/.env` từ file mẫu rồi thay các placeholder bằng cấu hình local:

```bash
cp .env.example .env
```

```dotenv
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"

PORT=3069
CORS_ORIGINS="http://localhost:3000"
FRONTEND_URL="http://localhost:3000"

ACCESS_TOKEN_SECRET="replace-with-a-strong-secret"
ACCESS_TOKEN_EXPIRES_IN="15m"
REFRESH_TOKEN_SECRET="replace-with-another-strong-secret"
REFRESH_TOKEN_EXPIRES_IN="7d"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CLIENT_URI_CALLBACK="http://localhost:3069/api/auth/google/callback"

CLOUDINARY_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

> Không commit `backend/.env`. Các giá trị secret ở trên chỉ là placeholder.

Sinh Prisma Client từ schema hiện tại:

```bash
npx prisma generate
```

Nếu cần đồng bộ lại Prisma schema từ database đang tồn tại, dùng:

```bash
npm run prisma
```

Lệnh này chạy `prisma db pull` trước khi generate, vì vậy có thể cập nhật `prisma/schema.prisma` theo database.

Khởi động backend:

```bash
npm run dev
```

Backend sẽ chạy tại `http://localhost:3069`.

### 2. Chuẩn bị frontend

Mở terminal khác:

```bash
cd frontend
npm install --legacy-peer-deps
```

Tạo `.env` từ file mẫu:

```bash
cp .env.example .env
```

Trên PowerShell có thể dùng:

```powershell
Copy-Item .env.example .env
```

Cấu hình frontend:

```dotenv
VITE_BASE_DOMAIN=http://localhost:3069/
VITE_GOOGLE_CLIENT_ID=
VITE_BASE_DOMAIN_CLOUDINARY=
VITE_IS_PRODUCTION=false
```

Khởi động frontend:

```bash
npm run dev
```

Mở `http://localhost:3000` trên trình duyệt.

### 3. Thứ tự chạy đề xuất

```text
MySQL → Backend :3069 → Frontend :3000
```

Frontend mặc định gọi API theo `VITE_BASE_DOMAIN`. Nếu frontend chạy trên nhiều origin, khai báo chúng trong `CORS_ORIGINS`, phân tách bằng dấu phẩy.

## Frontend routes

| Route | Mục đích | Yêu cầu đăng nhập |
|---|---|---|
| `/` | Trang chủ | Có |
| `/login` | Đăng nhập | Không |
| `/register` | Đăng ký | Không |
| `/login-callback` | Nhận kết quả OAuth | Không |
| `/profile` | Hồ sơ cá nhân | Có |
| `/setting` | Cài đặt tài khoản/giao diện | Có |
| `/user/:id` | Chi tiết người dùng | Có |
| `/admin/dashboard` | Bảng điều khiển quản trị | Có |
| `/admin/permission` | Quản lý permission | Có |
| `/admin/role` | Danh sách role | Có |
| `/admin/role/:id` | Chi tiết role | Có |
| `/test` | Màn hình thử nghiệm nội bộ | Không |

## Backend API groups

Tất cả REST API bên dưới có prefix `/api`.

| Prefix | Nội dung |
|---|---|
| `/api/auth` | Đăng ký, đăng nhập, refresh token, Google OAuth và thông tin đăng nhập |
| `/api/user` | CRUD người dùng và upload avatar |
| `/api/article` | CRUD bài viết |
| `/api/role` | CRUD role và bật/tắt role |
| `/api/chat-group` | CRUD nhóm chat |
| `/api/chat-message` | CRUD tin nhắn |
| `/api/demo` | Endpoint thử nghiệm |
| `/api/docs` | Swagger UI |

Swagger là nguồn tham khảo chi tiết về request/response của các endpoint đã được khai báo tài liệu.

## Scripts thường dùng

### Frontend

| Lệnh | Mục đích |
|---|---|
| `npm run dev` | Chạy Vite development server |
| `npm run build` | Type-check và build production vào `dist/` |
| `npm run preview` | Xem thử production build |
| `npm run start` | Chạy Vite preview trên `0.0.0.0` |
| `npm run lint` | Kiểm tra source bằng ESLint |

### Backend

| Lệnh | Mục đích |
|---|---|
| `npm run dev` | Chạy server với Nodemon |
| `npm run start` | Chạy server bằng Node.js |
| `npm run prisma` | Pull schema từ MySQL và generate Prisma Client |
| `npm test` | Chạy toàn bộ Jest test một lần với coverage |
| `npm run test:watch` | Chạy Jest với coverage ở chế độ watch |

## Build và chạy frontend bằng Docker

Frontend production image được build thành static files và phục vụ bằng Nginx:

```bash
cd frontend
docker build \
  --build-arg VITE_BASE_DOMAIN=http://localhost:3069/ \
  --build-arg VITE_GOOGLE_CLIENT_ID= \
  --build-arg VITE_BASE_DOMAIN_CLOUDINARY= \
  -t cyber-community-frontend .

docker run --rm -p 3001:80 --name cyber-community-frontend cyber-community-frontend
```

Sau đó mở `http://localhost:3001`.

> Biến `VITE_*` được đóng gói tại thời điểm build. Việc chỉ truyền env khi chạy container không thay đổi bundle JavaScript đã build.

Hiện repository chỉ có Dockerfile cho frontend. Backend vẫn cần chạy trực tiếp bằng Node.js hoặc bổ sung Dockerfile riêng trước khi triển khai toàn bộ stack bằng Docker Compose.

## CI/CD frontend

GitHub Actions frontend sử dụng các repository secrets:

| Secret | Ý nghĩa |
|---|---|
| `VITE_BASE_DOMAIN` | Domain backend được đóng gói vào frontend |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID phía trình duyệt |
| `VITE_BASE_DOMAIN_CLOUDINARY` | Base URL ảnh Cloudinary |

Pipeline build Docker image, lưu image thành artifact, sau đó runner CD tải artifact và chạy Nginx container tại host port `3001`.

## Kiểm tra trước khi commit

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend:

```bash
cd backend
npm test
```

## Lưu ý bảo mật

- Không commit `.env`, access token, refresh token, JWT secret, Google Client Secret hoặc Cloudinary API Secret.
- Chỉ các biến bắt đầu bằng `VITE_` mới được đưa vào frontend bundle; không đặt secret phía server trong biến `VITE_*`.
- `VITE_GOOGLE_CLIENT_ID` là định danh public, nhưng `GOOGLE_CLIENT_SECRET` chỉ được lưu ở backend.
- Production nên dùng HTTPS, cookie `HttpOnly`, `Secure`, `SameSite` phù hợp và CORS giới hạn đúng domain.
- Thay toàn bộ secret mẫu trước khi chạy ngoài môi trường local.

## Xử lý lỗi thường gặp

| Hiện tượng | Nguyên nhân thường gặp | Cách kiểm tra |
|---|---|---|
| Frontend không gọi được API | Backend chưa chạy hoặc sai `VITE_BASE_DOMAIN` | Mở `http://localhost:3069/api/docs` |
| Trình duyệt báo CORS | Frontend chạy khác origin được cho phép | Kiểm tra `CORS_ORIGINS` trong `backend/.env` |
| Prisma không kết nối MySQL | Sai `DATABASE_URL` hoặc MySQL chưa chạy | Kiểm tra user, password, host, port và database |
| Google OAuth callback lỗi | Callback URL không khớp Google Console | So sánh `GOOGLE_CLIENT_URI_CALLBACK` với cấu hình OAuth |
| Refresh một route frontend bị 404 | Static server thiếu SPA fallback | Với Nginx, giữ `try_files $uri /index.html` |
| Socket không kết nối | Backend URL/token sai hoặc server chưa chạy | Kiểm tra `VITE_BASE_DOMAIN` và Network/WebSocket |
| Ảnh Cloudinary không hiển thị | Thiếu base URL hoặc credentials | Kiểm tra biến Cloudinary ở frontend/backend |

## Trạng thái kiến trúc hiện tại

- Frontend là React SPA thuần dùng Vite và React Router.
- Client-side routing được quản lý bằng React Router.
- Backend phục vụ REST, GraphQL và Socket.IO trên cùng HTTP server.
- MySQL được truy cập qua Prisma và Sequelize tùy module.
- Frontend production được phục vụ dưới dạng static assets bằng Nginx.
