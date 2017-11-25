FROM node:latest

COPY . /repo
#COPY dist/ /usr/share/nginx/html
WORKDIR /repo
RUN npm install --unsafe-perm
RUN npm run build:prod
#WORKDIR /dist
#COPY ./repo/dist .
CMD npm run build:prod && npm http-server dist -p $PORT -c-1 --cors
