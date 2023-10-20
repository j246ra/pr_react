FROM node:20.8.1-bookworm-slim as assets

ENV APP_ROOT=/app
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT
COPY package.json yarn.lock ./
RUN yarn install

ARG HOST_URL
ARG API_HOST
ARG API_SCHEME
ENV REACT_APP_HOST_URL=${HOST_URL} \
    REACT_APP_API_HOST=${API_HOST} \
    REACT_APP_API_SCHEME=${API_SCHEME}

ENV GENERATE_SOURCEMAP=false

COPY . $APP_ROOT
RUN yarn build --prod

FROM nginx:1.25.2-alpine-slim as nginx

COPY ./containers/web/default.conf /etc/nginx/conf.d/default.conf
COPY --from=assets /app/build /usr/share/nginx/html
