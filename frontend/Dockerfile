# Stage 1
FROM node:16-alpine AS node

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent

COPY . . 

CMD ["npm", "start"]

# Stage 2
FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/build/ /usr/share/nginx/html
EXPOSE 80