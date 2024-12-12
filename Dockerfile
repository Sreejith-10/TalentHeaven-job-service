FROM node:18

WORKDIR /usr/src/app

COPY job-service/package*.json ./

RUN npm install

COPY job-service/src ./src

EXPOSE 3004

CMD [ "node","src/service.js" ]
