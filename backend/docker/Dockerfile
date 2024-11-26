FROM node:20-alpine as Builder
WORKDIR /builder

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
COPY tsconfig.json ./
COPY src  ./src
RUN yarn build

FROM node:20-alpine as Backend
WORKDIR /app
USER node

COPY --from=Builder builder/package.json builder/yarn.lock builder/tsconfig.json ./
COPY --from=Builder builder/dist/ ./dist
COPY --from=Builder builder/node_modules/ ./node_modules

CMD ["node","./dist/main.js"]