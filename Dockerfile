FROM node:12.18.1 AS NPM_BUILD_STAGE

WORKDIR /workspace

COPY ./ /workspace

RUN npm install

FROM node:12.18.1

COPY --from=NPM_BUILD_STAGE /workspace ./

CMD ["npm", "start"]