FROM node:21-alpine3.18 as base
WORKDIR /app
COPY package*.json .

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install

COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 5173
