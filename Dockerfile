# Stage 1: Base stage with Node.js Alpine image
FROM node:20-alpine AS builder

# Install libc6-compat for compatibility and globally install specific pnpm version
RUN apk add --no-cache libc6-compat && \
  npm install -g pnpm@9.1.1

# Set the working directory for subsequent instructions
WORKDIR /builder

# Copy package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies as per lock file without making updates
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Runner stage starts from the nginx:alpine image
FROM nginx:alpine AS runner

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static assets
RUN rm -rf ./*

# Copy built artifacts from the builder stage
COPY --from=builder /builder/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Inform Docker that the container is listening on port 80 at runtime
EXPOSE 80

# Define the command to run the app
ENTRYPOINT ["nginx", "-g", "daemon off;"]