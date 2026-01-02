FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# --host is required for Vite to work inside Docker
CMD ["npm", "run", "dev", "--", "--host"]