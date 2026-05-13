# Stage 1: Build the application
FROM node:22 AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential git \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the source code to the container
COPY . .

# Install dependencies
RUN npm install

# Stage 2: Run the application
FROM node:22

# Install ffmpeg and clean up in one line
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app /app

# Expose the port the app runs on
EXPOSE 3333
EXPOSE 1337

# Command to run the application
CMD ["node", "index.js"]