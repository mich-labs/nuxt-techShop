FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

ARG STRAPI_URL
ARG STRAPI_PUBLIC_ACCESS_TOKEN


ENV STRAPI_URL=$STRAPI_URL
ENV STRAPI_PUBLIC_ACCESS_TOKEN=$STRAPI_PUBLIC_ACCESS_TOKEN

ENV NODE_ENV=production

RUN npm run build


FROM node:24-slim

WORKDIR /app

COPY --from=builder /app/.output ./

ENV NODE_ENV=production
ENV NITRO_PORT=4040

EXPOSE 4040

CMD ["node", "server/index.mjs"]