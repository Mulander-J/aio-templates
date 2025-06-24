# ARG APP_ENV
# # use node 16 alpine image as build image
# FROM node:18.14.2-slim as Builder

# # create work directory in app folder
# WORKDIR /app

# # install required packages for node image
# RUN apk --no-cache add openssh g++ make python3 git

# # copy over package.json files
# COPY package.json /app/
# COPY pnpm-lock.json /app/

# # install all depencies
# RUN npm cache clean --force
# RUN npm install pnpm -g
# RUN pnpm install

# # copy over all files to the work directory
# ADD . /app

# # build the project
# RUN pnpm run build:$APP_ENV

# # start final image
# FROM node:18.14.2-slim

# WORKDIR /app

# # copy over build files from builder step
# COPY --from=Builder /app  /app

# # expose the host and port 3000 to the server
# ENV HOST 0.0.0.0
# EXPOSE 3000

# # run the build project with node
# ENTRYPOINT ["node", ".output/server/index.mjs"]


## 2.start without build

FROM node:18.14.2-slim

WORKDIR /app

ADD ./.output/ /app/

# expose the host and port 3000 to the server
ENV HOST 0.0.0.0
ENV NITRO_PORT 80
EXPOSE 80

# run the build project with node
ENTRYPOINT ["node", "server/index.mjs"]