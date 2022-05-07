package main
 
import (
    "flag"
    "fmt"
	"time"
	"net/http"
	"encoding/json"
	"bytes"
	"strings"
	"strconv"
)
 
func main() {
    // variables declaration  
    var gamename string    
    var players string 
	var rungames string      
	var concurrence string      
	var timeout string      
 
    // flags declaration using flag package
    flag.StringVar(&gamename, "game", "game", "Specify gamename. Default is game")
    flag.StringVar(&players, "players", "10", "Specify players. Default is 10")
	flag.StringVar(&rungames, "rungames", "1", "Specify players. Default is 1")
	flag.StringVar(&concurrence, "concurrence", "1", "Specify concurrence. Default is 1")
	flag.StringVar(&timeout, "timeout", "1", "Specify timeout. Default is 1")

 
    flag.Parse()  // after declaring flags we need to call it
 
  
    fmt.Println("-------------------------------------")

	repeticiones, _ := strconv.ParseInt(rungames, 10, 64)
	
	games := strings.Split(gamename, ";")
	games_ids := [...]string{"-1", "-1", "-1", "-1"}
	// key and value
	for key, value := range games {
		
		datos := strings.Split(value, "|")
		valor := strings.Trim(datos[0], " ") 
		
		games_ids[key] = valor
	}

	
	//Go Routines
	//wg := &sync.WaitGroup{}
	//wg2 := &sync.WaitGroup{}

		for i := 1; i <= int(repeticiones); i++ {

			for key, value := range games_ids {
				if value !=  "-1"{
					//wg.Add(1)
					//wg2.Add(1)
				
				key --

				fmt.Println( "Rabbit", "id: " + value + ", players: ", players)
				go showGoroutine(value,players)

				fmt.Println( "Kafka", "id: " + value + ", players: ", players)
				go showGoroutine2(value, players)
				}
			}	
		}
	
	 
	//wg.Wait()
	//wg2.Wait()
	timeout_sin_m := strings.Trim(timeout, "m")
	sleep,_ := strconv.Atoi(timeout_sin_m)
	
	time.Sleep(time.Duration(sleep) * time.Second)
} 


func showGoroutine(id_juego string, jugadores string){


	type Juego struct {
		Game_id string `json:"game_id"`
		Players   string `json:"players"`
	}
	juego := Juego{
		Game_id: id_juego,
		Players:  jugadores,
	}

	
	juegoComoJson, err := json.Marshal(juego)
	if err != nil {
		// Maneja el error de acuerdo a tu situación
		fmt.Println("Error codificando usuario como JSON: %v", err)
	}

    fmt.Println("     ---> " , bytes.NewBuffer(juegoComoJson))

	//ruta 2
	clienteHttp2 := &http.Client{}
	url2 := "http://rabbit2.34.121.30.144.nip.io/juego"
	
	peticion2, err := http.NewRequest("POST", url2, bytes.NewBuffer(juegoComoJson))
	if err != nil {
		// Maneja el error de acuerdo a tu situación
		fmt.Println("Error creando petición: %v", err)

	}

	// Podemos agregar encabezados
	peticion2.Header.Add("Content-Type", "application/json")
	respuesta2, err2 := clienteHttp2.Do(peticion2)

	if err2 != nil {
		// Maneja el error de acuerdo a tu situación
		fmt.Println("Error haciendo petición: %v", err2)
	}
	// No olvides cerrar el cuerpo al terminar
	
	defer respuesta2.Body.Close()

	time.Sleep(3 * time.Millisecond)
	//wg.Done()
}


func showGoroutine2(id_juego string, jugadores string){

	type Juego struct {
		Game_id string `json:"game_id"`
		Players   string `json:"players"`
	}
	juego := Juego{
		Game_id: id_juego,
		Players:   jugadores,
	}

	
	juegoComoJson, err := json.Marshal(juego)
	if err != nil {
		// Maneja el error de acuerdo a tu situación
		fmt.Println("Error codificando usuario como JSON: %v", err)
	}

    fmt.Println("     ---> " ,bytes.NewBuffer(juegoComoJson))

	//ruta 2
	clienteHttp2 := &http.Client{}
	url2 := "http://kafka2.34.121.30.144.nip.io/ /juego"
	
	peticion2, err := http.NewRequest("POST", url2, bytes.NewBuffer(juegoComoJson))
	if err != nil {
		// Maneja el error de acuerdo a tu situación
		fmt.Println("Error creando petición: %v", err)

	}

	// Podemos agregar encabezados
	peticion2.Header.Add("Content-Type", "application/json")
	respuesta2, err2 := clienteHttp2.Do(peticion2)

	if err2 != nil {
		// Maneja el error de acuerdo a tu situación
		fmt.Println("Error haciendo petición: %v", err2)
	}
	// No olvides cerrar el cuerpo al terminar
	
	defer respuesta2.Body.Close()

	time.Sleep(5 * time.Millisecond)
	//wg.Done()
}
