FROM node:16.17.0 as build
WORKDIR /usr/local/app
COPY . /usr/local/app/
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*


# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all application files
COPY . .

# Build the application in production mode
RUN npm run build --prod

# Optional: List contents of /app/dist for debugging
RUN ls -l /app/dist

# Stage 2: Serve the application with an Nginx server
FROM nginx:alpine

# Copy the Angular app output from the build stage to Nginx's web directory
COPY --from=build /usr/local/app/dist/khaddem-front /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
