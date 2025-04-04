# Étape 1 : Build Angular
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --output-path=dist

# Étape 2 : Serve avec http-server
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Suppression de la config par défaut de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Ajout de notre config nginx
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
