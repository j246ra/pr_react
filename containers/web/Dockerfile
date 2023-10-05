FROM node:20.5-bookworm as aseets

RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

ARG HOST_URL
ARG API_HOST
ARG API_SCHEME
ENV REACT_APP_HOST_URL=${HOST_URL} \
    REACT_APP_API_HOST=${API_HOST} \
    REACT_APP_API_SCHEME=${API_SCHEME}

COPY . /app
RUN yarn build

FROM nginx:1.23-bullseye as nginx

COPY ./containers/web/default.conf /etc/nginx/conf.d/default.conf
COPY --from=aseets /app/build /usr/share/nginx/html
