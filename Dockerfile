# stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

COPY safepet/package*.json .
RUN npm ci

COPY safepet .
RUN npm run build

# stage 2: run
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN apk add --no-cache openssl \
    && mkdir -p /etc/nginx/ssl \
    && openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
       -keyout /etc/nginx/ssl/selfsigned.key \
       -out /etc/nginx/ssl/selfsigned.crt \
       -subj "/CN=localhost"

RUN rm -rf ./*

COPY --from=build /app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
