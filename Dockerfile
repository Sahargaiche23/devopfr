# Étape de build
FROM node:16.17.0 as build

# Dossier de travail dans le conteneur
WORKDIR /usr/local/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Configuration npm pour les environnements derrière un proxy
# ⚠️ Remplace "http://proxy:port" par ton vrai proxy
RUN npm config set fetch-retry-maxtimeout 60000 && \
    npm config set fetch-timeout 60000 && \
    npm config set proxy http://proxy:port && \
    npm config set https-proxy http://proxy:port && \
    npm config set strict-ssl false && \
    npm install

# Copier le reste de l'application Angular
COPY . .

# Build Angular (ajuste selon ton script build si nécessaire)
RUN npm run build --prod

# Étape de production avec Nginx
FROM nginx:alpine
COPY --from=build /usr/local/app/dist/nom-de-ton-app /usr/share/nginx/html

# Copier un fichier de config nginx personnalisé si tu en as un
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
