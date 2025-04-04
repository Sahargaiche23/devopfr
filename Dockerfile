# Étape 1 : Construction de l'application Angular
FROM node:16.17.0 as build

# Définir le répertoire de travail
WORKDIR /usr/local/app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source de l'application
COPY . .

# Construire l'application Angular en mode production
RUN npm run build --prod

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Supprimer les anciens fichiers dans le répertoire HTML de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers compilés de Angular depuis l'étape de build
COPY --from=build /usr/local/app/dist/khaddem-front /usr/share/nginx/html

# Copier la configuration Nginx personnalisée (facultatif)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
