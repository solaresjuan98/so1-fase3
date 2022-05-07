FROM golang:1.17.9

WORKDIR /go/src/app

COPY . .

RUN go mod download


CMD ["go", "run", "consumer.go"]