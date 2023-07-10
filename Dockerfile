FROM node:20-slim as base
    ENV APPDIR /usr/cart-api

    WORKDIR $APPDIR

    RUN apt-get update && rm -rf /var/cache/apt/* /tmp/* /var/tmp/*

FROM base as development
    EXPOSE 8088 8089

    ENV NODE_ENV development
    ENV YARN_CACHE_FOLDER /usr/cart-api/.caches/yarn

    ENTRYPOINT ["./development_entrypoint.sh"]

FROM base as production
    ENV SERVER_PORT=8088
    EXPOSE 8088

    ENV NODE_ENV production

    RUN addgroup --gid 1001 --system cart-api && \
        adduser --uid 1001 --system --gid 1001 cart-api

    COPY . $APPDIR

    RUN yarn install

    USER cart-api

    ENTRYPOINT ["yarn", "start"]
