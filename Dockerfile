FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copiar projeto inteiro para evitar problemas de paths
COPY . ./

# Instalar dependências e fazer build do frontend
WORKDIR /app/frontend
RUN npm ci
RUN npm run build

# Backend stage
FROM node:20-alpine AS backend-runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copiar backend
COPY backend/package*.json ./backend/
COPY backend/modelos ./backend/modelos
COPY backend/server.js ./backend/
COPY backend/public ./backend/public

# Instalar dependências do backend
RUN cd backend && npm ci --omit=dev && cd ..

# Copiar build do frontend
COPY --from=frontend-builder /app/frontend/build ./frontend-build

EXPOSE 8080
CMD ["node", "backend/server.js"]
