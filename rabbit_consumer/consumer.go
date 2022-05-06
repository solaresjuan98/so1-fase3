package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/go-redis/redis/v8"
	_ "github.com/go-sql-driver/mysql"
	"github.com/streadway/amqp"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*

!New Struct
* Request_number
* game
* gamename
* winner
* players

*/

type Winner struct {
	Game_id   int
	Players   string
	Game_name string
	Winner    int
	Queue     string
}

type Log struct {
	Request_number int
	Game           int
	Gamename       string
	winner         string
	players        int
	worker         string
}

var ctx = context.Background()
var redisClient *redis.Client

func main() {
	host := os.Getenv("HOST")
	fmt.Println(host)
	//conn, err := amqp.Dial("amqp://AdminSO1:admin@34.125.65.198:5672/")
	conn, err := amqp.Dial("amqp://guest:guest@" + host + ":5672/")

	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	ch, err := conn.Channel()

	if err != nil {
		log.Fatal(err)
	}

	defer ch.Close()

	chDelivery, err := ch.Consume(
		"cola_ganadores",
		"",
		true,
		false,
		false,
		false, nil)

	if err != nil {
		log.Fatal(err)
	}

	noStop := make(chan bool)

	go func() {
		for delivery := range chDelivery {

			fmt.Println("message: " + string(delivery.Body))
			var winner Winner
			json.Unmarshal([]byte(delivery.Body), &winner)
			//!fmt.Println(winner.Game_id)
			fmt.Println(winner)
			addTidb(winner)
			addRedis(winner)
			addMongo(winner)
		}
	}()

	<-noStop
}

func addTidb(winner Winner) {

	db, err := sql.Open("mysql", "root:@tcp(34.135.246.61:4000)/Fase3")
	defer db.Close()

	if err != nil {
		log.Fatal(err)
	}

	var version string

	err2 := db.QueryRow("SELECT VERSION()").Scan(&version)

	if err2 != nil {
		log.Fatal(err2)
	}

	fmt.Println(version)

	//game_id, _ := strconv.Atoi( winner.Gameid )
	fmt.Print(winner)
	sql := "INSERT INTO ganadores(game_id, players, game_name, winner, queue) VALUES ( " + strconv.Itoa(winner.Game_id) + ",  \" " + winner.Players + " \" , \" " + winner.Game_name + " \" , \"" + strconv.Itoa(winner.Winner) + "\", \"" + "Rabbit" + "\" )"
	fmt.Print(sql)
	res, err := db.Exec(sql)
	if err != nil {
		panic(err.Error())
	}

	lastId, err := res.LastInsertId()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("The last inserted row id: %d\n", lastId)
}

func addRedis(winner Winner) {

	fmt.Println("Insertando en redis")
	var redis_address = "34.70.171.132:6379"
	var redis_password = ""

	rdb := redis.NewClient(&redis.Options{
		Addr:     redis_address,
		Password: redis_password,
		DB:       0,
	})

	redisClient = rdb
	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		fmt.Println(err)
	}

	winnerBytes, err := json.Marshal(winner)
	if err != nil {
		panic(err)
	}

	err = redisClient.Do(ctx, "lpush", "resultados", winnerBytes, 0).Err()
	//err = redisClient.Set(ctx, strconv.Itoa(winner.Game_id), winnerBytes, 0).Err()
	if err != nil {
		panic(err)
	}
}

// * Agregar a mongo DB
func addMongo(winner Winner) {
	fmt.Println("******MONGO********")
	var MONGO = "mongodb://35.193.171.150:27017/"

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

	collection := client.Database("Fase3").Collection("logs")
	res, insertErr := collection.InsertOne(ctx, winner)
	if insertErr != nil {
		log.Fatal(insertErr)
	}
	fmt.Println(res)
	fmt.Println("Información Almacenada en Mongodb")

}
