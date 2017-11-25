# Builds a Docker to deliver dist/
FROM nginx:latest
RUN apt-get install --yes nodejs
COPY . /repo
#COPY dist/ /usr/share/nginx/html
WORKDIR /repo
CMD npm run build:prod