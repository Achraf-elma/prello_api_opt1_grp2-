FROM alpine:3.1

FROM node:8

WORKDIR /app

COPY package*.json /app

RUN npm install


COPY . /app

EXPOSE 8080

#RUN docker compose up
#RUN docker compose run

CMD [ "npm", "start" ]
