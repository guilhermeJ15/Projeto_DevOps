# ---------- STAGE 1: build ----------
FROM node:20.10.0-alpine AS builder

WORKDIR /app

# Dependências - copiar package.json antes para aproveitar cache
COPY package.json package-lock.json ./

# Instala dependências (inclui devDependencies necessárias para compilar)
RUN npm install

# Copia o restante do código
COPY . .

# Compila TypeScript para ./dist (conforme tsconfig)
RUN npm run build

# ---------- STAGE 2: runtime ----------
FROM node:20.10.0-alpine AS runner
WORKDIR /app

# Só copiar o node_modules de production e os arquivos buildados
COPY --from=builder /app/package.json /app/package-lock.json ./
# Copia node_modules já instalados do estágio de build (inclui apenas o que for necessário)
COPY --from=builder /app/node_modules ./node_modules

# Copia dist compilado
COPY --from=builder /app/dist ./dist

# Copia .env.example ou outros arquivos que você quiser (opcional)
# COPY .env ./

# Porta exposta
EXPOSE 3000

# Healthcheck (opcional): verifica /items (ajuste se necessário)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/items', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

# Comando final
CMD ["node", "dist/server.js"]
