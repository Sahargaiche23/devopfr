FROM node:16.17.0 as build
WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm install
RUN npx ng build --configuration=production

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*

# Copie le build Angular dans le répertoire Nginx
COPY --from=build /usr/local/app/dist/khaddem-front /usr/share/nginx/html

# Copie la configuration de Nginx
COPY default.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
