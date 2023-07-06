ARG NODE_VERSION
ARG PORT

FROM node:${NODE_VERSION}

WORKDIR /simbirgwent-back

COPY package*.json ./

COPY . .

RUN npm ci

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]
