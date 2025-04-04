# Étape 1: Construire l'application Angular
FROM node:18 AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration production

# Étape 2: Servir avec Nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist/khaddem-front /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
