FROM node:16.18.1-alpine3.16

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
