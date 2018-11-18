FROM redis
COPY ./conf/redis.conf /usr/local/etc/redis/redis.conf
RUN useradd -rd /opt/redis redis
EXPOSE 6379
#CMD ['--protected-mode','no']
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]