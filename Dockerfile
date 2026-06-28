FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --omit=dev
COPY frontend/ ./
RUN npm run build

FROM node:20-alpine AS backend-runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copiar e instalar dependências do backend
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev && cd ..

# Copiar código do backend
COPY backend/ ./backend

# Copiar build do frontend para a localização esperada
COPY --from=frontend-builder /app/frontend/build ./frontend-build

EXPOSE 8080
CMD ["node", "backend/server.js"]
