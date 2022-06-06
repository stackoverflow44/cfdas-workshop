# build the image
ARG VER=alpine3.16

FROM golang:${VER} AS builder

LABEL deverloper=wah

# create a working directory
WORKDIR /app

# make sure that curl is installed
RUN apk update && apk add curl

# copy thee files from local into the container
ADD go.mod .
ADD go.sum .
ADD main.go .

# install the packages
RUN go build -o main main.go

# second container
FROM alpine:3.16
LABEL org.opencontainers.image.source=https://github.com/stackoverflow44/cfdas-workshop 

WORKDIR /app

COPY --from=builder /app/main main

ADD public public
ADD templates templates

# run the image
ENV APP_PORT=3000
EXPOSE ${APP_PORT}

# health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -s -f http://localhost:${APP_PORT}/healthz || exit 1
 
# run the application
ENTRYPOINT [ "./main" ]
