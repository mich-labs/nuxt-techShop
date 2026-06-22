FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:24-slim

WORKDIR /app

COPY --from=builder /app/.output .

ENV NITRO_PORT=4040

EXPOSE 4040

CMD ["node","server/index.mjs"]