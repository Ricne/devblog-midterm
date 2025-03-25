# Sử dụng Node.js 18
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json trước
COPY package.json package-lock.json ./

# Cài đặt dependencies một cách chắc chắn
RUN npm ci --omit=dev  

# Copy toàn bộ code vào container
COPY . .

# Expose cổng 3000
EXPOSE 3000

# Lệnh chạy app
CMD ["npm", "start"]