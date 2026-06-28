FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Copiar package.json e package-lock.json
COPY frontend/package*.json ./

# Instalar dependências do frontend
RUN npm install

# Copiar código fonte
COPY frontend/src ./src
COPY frontend/index.html ./
COPY frontend/vite.config.js ./
COPY frontend/.env* ./

# Build do frontend
RUN npm run build

FROM node:20-alpine AS backend-runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copiar e instalar dependências do backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev && cd ..

# Copiar código do backend
COPY backend/modelos ./backend/modelos
COPY backend/server.js ./backend/
COPY backend/public ./backend/public

# Copiar build do frontend para a localização esperada
COPY --from=frontend-builder /app/frontend/build ./frontend-build

EXPOSE 8080
CMD ["node", "backend/server.js"]
