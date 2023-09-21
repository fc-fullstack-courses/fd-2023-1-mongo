FROM node:18-alpine

RUN mkdir /server

WORKDIR /server

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]