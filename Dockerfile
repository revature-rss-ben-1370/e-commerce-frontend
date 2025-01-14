FROM node:12.18.1 AS NPM_BUILD_STAGE

WORKDIR /workspace

COPY ./ /workspace

RUN npm install

FROM node:12.18.1

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]
