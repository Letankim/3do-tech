# 1. Chọn Node.js base image
FROM node:22-alpine

# 2. Set working directory trong container
WORKDIR /app

# 3. Copy package.json và package-lock.json
COPY package*.json ./

# 4. Cài dependencies
RUN npm install

# 5. Copy toàn bộ project vào container
COPY . .

# 6. Build project (Next.js)
RUN npm run build

# 7. Expose port 3000
EXPOSE 3000

# 8. Chạy ứng dụng
CMD ["npm", "start"]
