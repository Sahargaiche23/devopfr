# Étape 1 : Build de l'application Angular
FROM node:18-alpine AS build

# Dossier de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Build Angular (avec configuration production)
RUN npm run build -- --configuration=production

# Étape 2 : Serveur NGINX pour héberger l'app
FROM nginx:alpine

# Supprimer les fichiers par défaut de NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers compilés Angular dans NGINX
COPY --from=build /app/dist/KhaddemFront /usr/share/nginx/html

# Copier la config NGINX personnalisée si nécessaire (facultatif)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port
EXPOSE 80

# Commande de démarrage de NGINX
CMD ["nginx", "-g", "daemon off;"]
