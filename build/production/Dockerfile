FROM node:21-alpine3.18 as base
WORKDIR /app
COPY package*.json .

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install

COPY . .

FROM base as prod

RUN npm run build

# Use separate stage for deployable image
FROM nginxinc/nginx-unprivileged:1.23-alpine-perl

COPY --link --from=prod /app/dist/ /usr/share/nginx/html

EXPOSE 8080


