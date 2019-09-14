FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY yarn.lock ./
COPY package.json ./
RUN yarn

COPY . .

# Build
RUN yarn build

# Bundle app source

EXPOSE 8080
CMD [ "node", "server.js" ]