FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend
# Copiar package files
COPY frontend/package.json frontend/package-lock.json ./
# Instalar dependências
RUN npm install --production=false

# Copiar vite config e código fonte
COPY frontend/index.html frontend/vite.config.js ./
COPY frontend/src ./src

# Build
RUN npm run build

# Backend runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Instalar dependências do backend
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install --omit=dev && cd ..

# Copiar backend code
COPY backend/modelos ./backend/modelos
COPY backend/server.js ./backend/
COPY backend/public ./backend/public

# Copiar built frontend
COPY --from=frontend-builder /app/frontend/build ./frontend-build

EXPOSE 8080
CMD ["node", "backend/server.js"]
