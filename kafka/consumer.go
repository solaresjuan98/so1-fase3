package main

import (
	"context"

	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/signal"

	"syscall"
	"time"

	"github.com/Shopify/sarama"

	_ "github.com/go-sql-driver/mysql"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Winner struct {
	gameid     int
	Players     int
	Gamename   string
	Winner      int
	Worker       string
	 
	Request_number int
}

func main() {

	topic := "my-topic"
	worker, err := connectConsumer([]string{"my-cluster-kafka-bootstrap.kafka:9092"})
	if err != nil {
		panic(err)
	}

	// Calling ConsumePartition. It will open one connection per broker
	// and share it for all partitions that live on it.
	consumer, err := worker.ConsumePartition(topic, 0, sarama.OffsetOldest)
	if err != nil {
		panic(err)
	}
	fmt.Println("Consumer started ")
	sigchan := make(chan os.Signal, 1)
	signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)
	// Count how many message processed
	msgCount := 0

	// Get signal for finish
	doneCh := make(chan struct{})
	go func() {
		for {
			select {
			case err := <-consumer.Errors():
				fmt.Println(err)
			case msg := <-consumer.Messages():
				msgCount++
				fmt.Printf("Received message Count %d: | Topic(%s) | Message(%s) \n", msgCount, string(msg.Topic), string(msg.Value))

				var winner Winner
				json.Unmarshal([]byte(msg.Value), &winner)
				addMongo(winner)
			

			case <-sigchan:
				fmt.Println("Interrupt is detected")
				doneCh <- struct{}{}
			}
		}
	}()

	<-doneCh
	fmt.Println("Processed", msgCount, "messages")

	if err := worker.Close(); err != nil {
		panic(err)
	}

}

func connectConsumer(brokersUrl []string) (sarama.Consumer, error) {
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	// Create new consumer
	conn, err := sarama.NewConsumer(brokersUrl, config)
	if err != nil {
		return nil, err
	}

	return conn, nil
}

//
func addMongo(winner Winner) {
	fmt.Println("******MONGO********")
	var MONGO = "mongodb://34.125.244.173:27017"

	client, err := mongo.NewClient(options.Client().ApplyURI(MONGO))
	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	// winnerBytes, err := json.Marshal(winner)
	// if err != nil {
	// 	panic(err)
	// }

	collection := client.Database("practica2").Collection("logs")
	res, insertErr := collection.InsertOne(ctx, winner)
	if insertErr != nil {
		log.Fatal(insertErr)
	}
	fmt.Println(res)
	fmt.Println("Información Almacenada en Mongo")

}

