# Node.js base image
FROM node:20-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Application port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]