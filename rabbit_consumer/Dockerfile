FROM golang:1.16-alpine
WORKDIR /
COPY . .
RUN go mod download
CMD ["go", "run", "consumer.go"]