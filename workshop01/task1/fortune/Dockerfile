# build the image
ARG VER=18.2.0

FROM node:${VER}

LABEL deverloper=wah

# create a working directory
WORKDIR /app

# make sure that curl is installed
RUN apt update && apt install curl

# copy thee files from local into the container
ADD package.json . 
ADD package-lock.json .
# add directory
ADD public public
ADD views views
# put mutable files at the bottom
ADD main.js .

# install the packages
RUN npm ci

# run the image
ENV APP_PORT=3000
EXPOSE ${APP_PORT}

# health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -s -f http://localhost:${APP_PORT}/healthz || exit 1
 
# run the application
ENTRYPOINT [ "node", "main.js" ]
#CMD ["${APP_PORT}"]