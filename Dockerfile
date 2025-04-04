# Étape de build
FROM node:16.17.0 as build

# Dossier de travail dans le conteneur
WORKDIR /usr/local/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances npm (avec configuration pour éviter les timeouts)
RUN npm config set fetch-retry-maxtimeout 60000 && \
    npm config set fetch-timeout 60000 && \
    npm install

# Copier tous les fichiers sources dans le conteneur
COPY . .

# Exécuter la commande build pour créer la version de production de l'app
RUN npm run build --configuration production

# Étape de production avec Nginx
FROM nginx:alpine

# Copier l'application construite à partir de l'étape de build vers Nginx
COPY --from=build /usr/local/app/dist/khaddem-front /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'app
EXPOSE 80

# Démarrer Nginx en mode non-démon
CMD ["nginx", "-g", "daemon off;"]
