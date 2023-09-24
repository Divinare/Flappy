# Stage 1: Build the application
FROM node:16 AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY yarn.lock package.json ./
RUN yarn

# Copy the source code and build
COPY . .
RUN yarn build

# Stage 2: Create a lightweight production image
FROM node:16-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app .

# Start the application
CMD ["node", "server.js"]