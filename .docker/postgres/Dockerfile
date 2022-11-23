FROM postgres

RUN usermod -u 1000 postgres

COPY ./scripts/ /docker-entrypoint-initdb.d/
