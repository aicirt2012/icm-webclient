FROM node:latest

# Deepcopy of repo
COPY . /repo
WORKDIR /repo

# Install dependencies
RUN npm install --unsafe-perm
RUN npm install http-server -g

# Build once to ensure build is working correct 
# If it is not possible to build it should fail here!
RUN npm run build:prod 

# Build on every container restart in oder to ensure 
# bindings of docker compose environement variables
# c = cache time in s; -c-1 => disabled 
CMD npm run build:prod && http-server dist -p $PORT -c3600 --cors --gzip
