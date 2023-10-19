FROM node:20.8.1-bookworm-slim as base

RUN apt-get update && \
    apt-get -y -qq install git

RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
