FROM node:14.15.5-alpine AS builder
# Making notifications directory
RUN mkdir -p /usr/src/app/notifications
# Set up the directory as working directory
WORKDIR /usr/src/app/notifications
# Copy dependency definitions
COPY package.json /usr/src/app/notifications
# Install dependencies
RUN npm install
# Get all the code needed to run the app
COPY . /usr/src/app/notifications
# Expose the port the app runs in
EXPOSE 3010
# Serve the app
CMD ["npm", "start"]