# get the base node image
FROM node:14-alpine

# create app directory and set it as the working dir for container
RUN mkdir -p /usr/src/be/app
WORKDIR /usr/src/be/app

# copy the json file and package-lock.json to Docker environment
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

# install npm dependencies
RUN npm install

# copy app source code files to Docker environment
COPY . .

# Uses port which is used by the actual application
# EXPOSE 5000

# build the folder
CMD [ "npm", "start" ]