# Sử dụng image Node.js chính thức
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Sao chép toàn bộ source code vào container
COPY . .

# Nếu bạn muốn tạo người dùng cho MongoDB, bạn cần sao chép file user.json vào thư mục khởi tạo MongoDB
COPY user.json /docker-entrypoint-initdb.d/

# Expose port (tùy vào ứng dụng Node.js)
EXPOSE 3000

# Chạy ứng dụng Node.js
CMD ["node", "bin/www"]