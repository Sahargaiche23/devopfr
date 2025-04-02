# Étape 1 : Construction de l'application Angular
FROM node:16.17.0 as build
WORKDIR /app

# Copier les fichiers source Angular
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npx ng build --configuration=production

# Étape 2 : Configuration de Nginx pour servir l'application Angular
FROM nginx:latest

# Copier le build Angular dans Nginx
COPY --from=build /app/dist/khaddem-front /usr/share/nginx/html

# Vérifier les permissions et les ajuster
RUN chmod -R 755 /usr/share/nginx/html

# Copier la configuration Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
