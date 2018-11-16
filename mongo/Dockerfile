FROM mongo
ENV HOSTNAME mongo
COPY ./conf/mongo.conf /usr/local/etc/mongo/mongo.conf
RUN useradd -rd /opt/mongo mongo
EXPOSE 27017
CMD ["mongod"]