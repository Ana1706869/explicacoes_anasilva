FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Copiar apenas package.json para instalar dependências
COPY frontend/package*.json ./
RUN npm ci

# Copiar source code do frontend (node_modules será ignorado pelo .dockerignore)
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
RUN cd backend && npm ci --omit=dev && cd ..

# Copiar código do backend (menos node_modules)
COPY backend/modelos ./backend/modelos
COPY backend/server.js ./backend/
COPY backend/public ./backend/public

# Copiar build do frontend para a localização esperada
COPY --from=frontend-builder /app/frontend/build ./frontend-build

EXPOSE 8080
CMD ["node", "backend/server.js"]
