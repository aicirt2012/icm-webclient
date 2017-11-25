FROM node:latest

COPY . /repo
#COPY dist/ /usr/share/nginx/html
WORKDIR /repo
RUN npm install --unsafe-perm
RUN npm install http-server -g
RUN npm run build:prod
#WORKDIR /dist
#COPY ./repo/dist .
CMD npm run build:prod && http-server dist -p $PORT -c-1 --cors
