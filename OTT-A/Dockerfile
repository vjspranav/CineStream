# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json into the container at /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app except for node_modules
COPY . /app

# Make port 5001 (or 5002 for OTT-B) available to the world outside this container
EXPOSE 3002

# Define environment variable
ENV NAME World

# Run index.js when the container launches
CMD ["npm", "start"]
