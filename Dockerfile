FROM alpine:3.1

FROM node:8

COPY package*.json ./

RUN npm install

RUN useradd -rd /opt/prello_api_opt1_grp2  prello_api_opt1_grp2 
WORKDIR /opt/prello_api_opt1_grp2 

COPY . /opt/prello_api_opt1_grp2/

EXPOSE 3000 

#RUN docker compose up
#RUN docker compose run

CMD [ "npm", "start" ]