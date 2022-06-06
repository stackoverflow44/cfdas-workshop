# build the image
ARG VER=3.10.4-buster

FROM python:${VER}

LABEL deverloper=wah

# create a working directory
WORKDIR /app

# make sure that curl is installed
RUN apt update && apt install curl

# copy thee files from local into the container
ADD requirements.txt . 
ADD utils.py .
ADD run.sh .
ADD main.py .
# add directory
ADD public public
ADD templates templates

# install the packages
RUN pip3 install -r requirements.txt

# run the image
ENV APP_PORT=3000
EXPOSE ${APP_PORT}

# health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -s -f http://localhost:${APP_PORT}/healthz || exit 1
 
# run the application
ENTRYPOINT [ "./run.sh" ]
