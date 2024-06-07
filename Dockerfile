FROM oven/bun:alpine as base
WORKDIR /usr/src/app

FROM base as install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY . .
COPY lib .

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app/cli.ts .
COPY --from=prerelease /usr/src/app/lib ./lib
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/docker.env .env

RUN apk add nagios-plugins-dns

ENTRYPOINT [ "bun", "run", "index.ts" ]