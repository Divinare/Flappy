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

CMD [ "node", "server.js" ]