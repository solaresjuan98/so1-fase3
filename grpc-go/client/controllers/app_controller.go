package controllers

import (
	// "context"
	// "mongo-backend/configs"
	// "mongo-backend/models"

	"fmt"
	"os"

	//"io/ioutil"

	//	"log"
	"log"
	"net/http"

	//	"time"
	"context"

	pb "client/proto"

	"time"

	//"github.com/go-playground/validator/v10"

	"google.golang.org/grpc"

	"github.com/gofiber/fiber/v2"
	// "go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	// "go.mongodb.org/mongo-driver/mongo"
)

// Get result from mongo db
type juego struct {
	Game_id string `json:"game_id"`
	Players string `json:"players"`
}

func Inicio(c *fiber.Ctx) error {

	/*
	   newBookmark := new(database.Bookmark)

	   	err := c.BodyParser(newBookmark)
	   	if err != nil {
	   		c.Status(400).JSON(&fiber.Map{
	   			"success": false,
	   			"message": err,
	   			"data":    nil,
	   		})
	   		return err
	   	}

	*/

	// var game juego

	newGAME := new(juego)
	fmt.Println(newGAME)
	fmt.Println("Hola")

	err := c.BodyParser(newGAME)
	if err != nil {

		return c.Status(400).JSON(&fiber.Map{
			"success": false,
			"message": err,
			"data":    nil,
		})
		//return err
	}

	/* test */
	// return c.Status(400).JSON(&fiber.Map{
	// 	"success":   false,
	// 	"juego":     newGAME.Juego,
	// 	"jugadores": newGAME.Jugador,
	// })
	/* end test */

	fmt.Print(newGAME)
	host := os.Getenv("HOST") // 34.125.65.198
	conn, err := grpc.Dial(host+":50051", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	defer conn.Close()

	efe := pb.NewServicioNodejsClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)

	defer cancel()
	reply, err := efe.IniciarJuego(ctx, &pb.PlayerGameRequest{
		Game:    newGAME.Game_id,
		Players: newGAME.Players,
	})

	//fmt.Println("3")
	fmt.Println(reply.GetMensajeganador())
	fmt.Println(err)

	return c.Status(http.StatusOK).JSON(Bienvenidos{
		//Status: http.StatusOK,
		Bienvenido: "se agrego perro",
	})

}

func Bienvenido(c *fiber.Ctx) error {

	return c.Status(http.StatusOK).JSON(Bienvenidos{
		//Status: http.StatusOK,
		Bienvenido: "chinga tu madre",
	})

}

type Bienvenidos struct {
	Status     int    `json:"status"`
	Message    string `json:"message"`
	Bienvenido string `json:"Bienvenido"`
}

/*package main

import (
	"context"
	"fmt"
	pb "github.com/tomiok/grpc-test-wishlist/proto"
	"google.golang.org/grpc"
	"math/rand"
	"strconv"
	"time"
)

func generateID() string {
	rand.Seed(time.Now().Unix())
	return "ID: " + strconv.Itoa(rand.Int())
}

func main() {
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())

	if err != nil {
		panic("cannot connect with server " + err.Error())
	}

	serviceClient := pb.NewWishListServiceClient(conn)

	res, err := serviceClient.Create(context.Background(), &pb.CreateWishListReq{
		WishList: &pb.WishList{
			Id:   generateID(),
			Name: "tu madre ",
		},
	})

	if err != nil {
		panic("wishlist is not created  " + err.Error())
	}

	fmt.Println(res.WishListId)

}*/
