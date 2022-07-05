FROM node:12.18.1 as build

WORKDIR /workspace

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.17.3 as nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY frontend-nginx.conf /etc/nginx/conf.d

COPY --from=build /workspace/build /usr/share/nginx/html

CMD ["nginx", "-c", "/etc/nginx/conf.d/frontend-nginx.conf"]
