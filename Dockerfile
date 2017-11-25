# Builds a Docker to deliver dist/
FROM nginx:latest
RUN sudo apt-get update
RUN sudo apt-get install -y nodejs
COPY . /repo
#COPY dist/ /usr/share/nginx/html
WORKDIR /repo
CMD npm run build:prod