FROM golang:alpine AS gobuilder

RUN mkdir /app
ADD ./src /app/
WORKDIR /app
RUN go build -o app main.go

FROM golang:alpine AS runner
RUN mkdir -p /app
COPY --from=gobuilder /app/app /app/storage-app
WORKDIR /app

# Backend settings
ENV LOGGING_PRIORITY DEBUG
ENV SERVER_HOST 0.0.0.0
ENV SERVER_PORT 5000

EXPOSE $SERVER_PORT

RUN adduser -S -D -H -h /app storage-app-user
USER storage-app-user

CMD ["./storage-app"]
