package responses

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

type UserResponse struct {
	Status   int        `json:"status"`
	Message  string     `json:"message"`
	Data     *fiber.Map `json:"data"`
	Nombrevm string     `json:"nombreVM"`
	Endpoint string     `json:"endpoint"`
	Fecha    time.Time  `json:"fecha"`
}

type Process struct {
	Status   int        `json:"status"`
	Message  string     `json:"message"`
	Data     *fiber.Map `json:"data"`
	Nombrevm string     `json:"nombreVM"`
	Endpoint string     `json:"endpoint"`
	Fecha    time.Time  `json:"fecha"`
}

type Inicio struct{
	Status   int        `json:"status"`
	Message  string     `json:"message"`
	Bienvenido string    `json:"Bienvenido"`
 



}

/*

func CreateProduct(c *fiber.Ctx) {
    // Instantiate new Product struct
    p := new(model.Product)
    //  Parse body into product struct
    if err := c.BodyParser(p); err != nil {
        log.Println(err)
        c.Status(400).JSON(&fiber.Map{
            "success": false,
            "message": err,
          })
        return
    }
    // Insert Product into database
    res, err := database.DB.Query("INSERT INTO products (name, description, category, amount) VALUES ($1, $2, $3, $4)" , p.Name, p.Description, p.Category, p.Amount )
    if err != nil {
        c.Status(500).JSON(&fiber.Map{
            "success": false,
            "message": err,
          })
        return
    }
    // Print result
    log.Println(res)

    // Return Product in JSON format
    if err := c.JSON(&fiber.Map{
        "success": true,
        "message": "Product successfully created",
        "product": p,
      }); err != nil {
        c.Status(500).JSON(&fiber.Map{
            "success": false,
            "message":  "Error creating product",
          })
        return
    }
}

*/