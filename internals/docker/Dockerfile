# Stage 0 - Build App in production mode
FROM node:10 as build-stage
WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install

COPY ./src /app/src
COPY ./internals /app/internals
COPY tsconfig.json /app/tsconfig.json

RUN yarn build

# Stage 1 - Setup Nginx files and copy over dist folder
FROM nginx:alpine

ENV DEBUG=off \
  APP_DIR=/app \
  CLIENT_BODY_TIMEOUT=10 \
  CLIENT_HEADER_TIMEOUT=10 \
  CLIENT_MAX_BODY_SIZE=1024

COPY ./internals/docker/robots.txt /app/robots.txt
COPY ./internals/docker/nginx.conf /etc/nginx/conf.d/app.conf.template
COPY ./internals/docker/start-nginx.sh /usr/sbin/start
COPY ./assets/ /app/assets/
COPY --from=build-stage /app/dist/ /app/

RUN chmod u+x /usr/sbin/start
WORKDIR /app

EXPOSE 80 443
CMD [ "start" ]
