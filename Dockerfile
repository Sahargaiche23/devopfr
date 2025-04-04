# Étape 1 : Build Angular
FROM node:16.17.0 as build
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration production

# Étape 2 : Serve avec Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/local/app/dist/KhaddemFront /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
