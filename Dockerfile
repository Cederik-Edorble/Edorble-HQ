# pull official base image
FROM node:13.12.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# install app dependencies
COPY package*.json /usr/src/app/
RUN npm install --silent
# add app
COPY . /usr/src/app
RUN npm run build
EXPOSE 3000
# start app
CMD ["npm", "start"]