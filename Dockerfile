# Builds a Docker to deliver dist/
FROM nginx:latest
RUN apt-get update
RUN apt-get install -y nodejs
COPY . /repo
#COPY dist/ /usr/share/nginx/html
WORKDIR /repo
CMD npm run build:prod