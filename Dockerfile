FROM node:12.18.1

WORKDIR /workspace

copy ./ /workspace

RUN npm install

EXPOSE 3000

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]

