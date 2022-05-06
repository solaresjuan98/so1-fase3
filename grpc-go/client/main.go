

package main

import (
	//"mongo-backend/configs"
	"client/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	app := fiber.New()

	// // Run mongo database
	// configs.ConnectDB()

	// CORS
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.UserRoute(app)

	app.Listen(":5000")
}
