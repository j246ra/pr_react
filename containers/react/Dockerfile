FROM node:20.8.1-bookworm-slim as base

RUN apt-get update -qq && apt-get install -yq --no-install-recommends\
    git\
    && apt-get clean\
    && rm -rf /var/lib/apt/lists/*

ENV APP_ROOT=/app
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY package.json yarn.lock ./
RUN yarn install
