FROM node:14-alpine
WORKDIR / 
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 50051
CMD ["node", "index.js"]