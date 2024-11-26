FROM node:20-alpine AS builder
COPY package.json yarn.lock ./
RUN yarn
COPY src  ./src
COPY index.html tsconfig.json tsconfig.node.json vite.config.ts eslint.config.js ./
RUN yarn build

FROM nginx:1.24-alpine AS frontend
WORKDIR /app

COPY --from=builder dist ./dist
COPY nginx/default.conf /etc/nginx/nginx.conf.template
CMD /bin/sh -c "envsubst '\$BURL,\$WS_SERVER_PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"