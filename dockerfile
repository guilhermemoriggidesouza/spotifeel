FROM node:14

WORKDIR /usr/src

COPY ./app/package*.json ./
RUN npm install
COPY ./app .
EXPOSE 5000
CMD [ "node", "app.js" ]