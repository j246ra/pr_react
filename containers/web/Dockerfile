FROM node:20.18.3-bookworm-slim as assets

RUN apt-get update -qq && apt-get install -yq --no-install-recommends\
    ca-certificates

ENV APP_ROOT=/app
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT
COPY package.json yarn.lock ./
RUN yarn install

ARG HOST_URL
ARG API_HOST
ARG API_SCHEME
ARG SENTRY_DSN
ARG SENTRY_AUTH_TOKEN

ENV REACT_APP_HOST_URL=${HOST_URL} \
    REACT_APP_API_HOST=${API_HOST} \
    REACT_APP_API_SCHEME=${API_SCHEME} \
    REACT_APP_SENTRY_DSN=${SENTRY_DSN}

ENV GENERATE_SOURCEMAP=false

COPY . $APP_ROOT
RUN yarn build

FROM nginx:1.26.1-alpine-slim as nginx

COPY ./containers/web/default.conf /etc/nginx/conf.d/default.conf
COPY --from=assets /app/build /usr/share/nginx/html
