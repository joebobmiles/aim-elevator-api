FROM node:18.17.1-alpine3.17

ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

WORKDIR /srv/elevator-api
COPY . .
RUN npm ci
RUN npm run build

CMD [ "node", "dist/index.js" ]