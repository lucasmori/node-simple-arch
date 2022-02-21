FROM node:16

WORKDIR /opt/app-root/src

COPY . .

RUN npm i