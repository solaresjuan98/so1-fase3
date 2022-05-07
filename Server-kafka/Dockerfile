FROM golang:1.17.9
WORKDIR /go/src/app

COPY . .

RUN go mod download
EXPOSE 50555

CMD ["go", "run", "main.go"]