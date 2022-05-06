package routes

import (
	"client/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoute(app *fiber.App) {
	// routes

	app.Post("/juego", controllers.Inicio)
	app.Get("/", controllers.Bienvenido)

}
