FROM node:alpine

RUN npm install -g angular-cli

ADD . /opt/frontend

WORKDIR /opt/frontend

RUN apk add --update python python-dev
ENV BUILD_PACKAGES nasm alpine-sdk coreutils autoconf automake git libpng-dev libpng zlib zlib-dev
RUN apk --no-cache add $BUILD_PACKAGES && npm install && apk del $BUILD_PACKAGES

RUN rm -Rf dist && mkdir dist

CMD ["ng", "build"]

VOLUME /opt/frontend/dist
