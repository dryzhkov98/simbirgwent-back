ARG NODE_VERSION
ARG APP_PORT

ENV NODE_VERSION=$NODE_VERSION
ENV APP_PORT=$APP_PORT

FROM node:${NODE_VERSION}

WORKDIR /simbirgwent-back

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start:prod"]