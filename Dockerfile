# Use uma imagem leve para o estágio de build
FROM node:22-alpine as builder

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

# Construa a aplicação Vite (isso irá gerar os arquivos em /src/dist)
RUN npm run build

# --- Estágio de produção ---
# Use uma imagem base minimalista para o ambiente de execução
FROM node:22-alpine

WORKDIR /usr/src/app

# Copie os arquivos de build do estágio "builder"
COPY --from=builder /src/dist ./dist

# Instale o 'serve' globalmente para servir os arquivos estáticos
# Alternativamente, você pode instalá-lo como uma dependência de dev no projeto
# e usar `npm install --production` no estágio final se preferir.
RUN npm install -g serve

# Expõe a porta que o CapRover irá mapear (geralmente 80 ou a porta configurada no CapRover)
# A porta 4173 é a porta padrão do Vite para preview, mas em produção,
# o CapRover geralmente mapeia para 80 ou usa sua própria porta interna ($PORT).
EXPOSE 80

# Comando para rodar a aplicação usando 'serve'
# O CapRover injeta a porta em $PORT, então use-a para ser flexível.
CMD ["serve", "-s", "dist", "-l", "tcp://$HOST:$PORT"]

# Ou se você não quiser usar $HOST:$PORT e preferir apenas a porta:
# CMD ["serve", "-s", "dist", "-p", "80"]