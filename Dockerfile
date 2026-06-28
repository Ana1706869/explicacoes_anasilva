FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copiar todo o frontend (será ignorado node_modules pelo .dockerignore)
COPY frontend frontend/

WORKDIR /app/frontend

# Instalar dependências
RUN npm install --production=false

# Build
RUN npm run build

# Backend stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copiar e instalar dependências do backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev && cd ..

# Copiar backend code
COPY backend/modelos ./backend/modelos
COPY backend/server.js ./backend/
COPY backend/public ./backend/public

# Copiar built frontend
COPY --from=frontend-builder /app/frontend/build ./frontend-build

EXPOSE 8080
CMD ["node", "backend/server.js"]
