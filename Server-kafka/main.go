package main

import (
	"encoding/json"
	"fmt"
	"log"
	
  
	"math/rand"
	"net"
	"reflect"
	"strconv"
	"strings"
	"time"
   // "github.com/joho/godotenv"
	"github.com/Shopify/sarama"
	pb "github.com/felipejfc/go-node-grpc-example/go/protos"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

)

const (
	port = ":50555"
)

type cola struct {
	gameid     int
	Players     int
	Gamename   string
	Winner      int
	Worker       string
	 
	Request_number int

}

type server struct{}
var contador =0
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {

	fmt.Printf("received rpc from client, name=%s\n", in.GetName())

	delimitador := ","
	nombresComoArreglo := strings.Split(in.Name, delimitador)
	for _, nombre := range nombresComoArreglo {
	
		juego := nombresComoArreglo[0]
		jugadores_str := nombresComoArreglo[1]

		fmt.Println(juego)
		switch nombre {
		case "1":

			contador=contador+1
			intVar, err := strconv.Atoi(jugadores_str)
			fmt.Println(intVar, err, reflect.TypeOf(intVar))

			contenido := juego1(intVar)
			var cont cola
			cont.gameid = 1
			cont.Players = intVar
			cont.Gamename = "Random1"
			cont.Winner = contenido.nombre
			cont.Worker = "Kafka"
			cont.Request_number=contador
			
			

			fmt.Println(cont)
		
			objBytes, _ := json.Marshal(cont)
			agregarEnCola("my-topic", objBytes)

			//objBytes, _ := json.Marshal(cont)
		
		
			//	agregarEnCola("stack_winner", objBytes)

		case "2":
			intVar, err := strconv.Atoi(jugadores_str)

			fmt.Println(intVar, err, reflect.TypeOf(intVar))
			contador=contador+1
			contenido := juego2(intVar)
			var cont cola
			cont.gameid = 2
			cont.Players = intVar
			cont.Gamename = "BlackJACK"
			cont.Winner = contenido.nombre
			cont.Worker = "Kafka"
			cont.Request_number=contador
		
			
			fmt.Println(cont)

			objBytes, _ := json.Marshal(cont)
			agregarEnCola("my-topic", objBytes)

		case "3":
			intVar, err := strconv.Atoi(jugadores_str)
			fmt.Println(intVar, err, reflect.TypeOf(intVar))

			contenido := juego3(intVar)
			var cont cola
			cont.gameid = 3
			cont.Players = intVar
			cont.Gamename = "Random2"
			cont.Winner = contenido.nombre
			cont.Worker = "Kafka"
			contador=contador+1
			cont.Request_number=contador
	
			fmt.Println(cont)

			objBytes, _ := json.Marshal(cont)
			agregarEnCola("my-topic", objBytes)
		case "4":
			intVar, err := strconv.Atoi(jugadores_str)
			fmt.Println(intVar, err, reflect.TypeOf(intVar))

			contenido := juego4(intVar)
			var cont cola
			cont.gameid = 4
			cont.Players = intVar
			cont.Gamename = "Letters"
			cont.Winner = contenido.nombre
			cont.Worker = "Kafka"
			contador=contador+1
			cont.Request_number=contador
		
			fmt.Println(cont)

			objBytes, _ := json.Marshal(cont)
			agregarEnCola("my-topic", objBytes)

		case "5":
			intVar, err := strconv.Atoi(jugadores_str)
			fmt.Println(intVar, err, reflect.TypeOf(intVar))

			contenido := juego5(intVar)
			var cont cola
			cont.gameid = 5
			cont.Players = intVar
			cont.Gamename = "Pokar"
			cont.Winner = contenido.nombre
			cont.Worker = "Kafka"
			contador=contador+1
			cont.Request_number=contador
			fmt.Println("objeto")
			fmt.Println(cont)
			fmt.Println("objeto")
			fmt.Println(cont)
			objBytes, _ := json.Marshal(cont)
			agregarEnCola("my-topic", objBytes)

		default:

		}

	}

	return &pb.HelloReply{Message: "Hello " + in.Name}, nil

}

// COLAS KAFKA

func ConnectProducer(brokersUrl []string) (sarama.SyncProducer, error) {

	config := sarama.NewConfig()
	config.Producer.Return.Successes = true
	config.Producer.RequiredAcks = sarama.WaitForAll
	config.Producer.Retry.Max = 5

	//

	conn, err := sarama.NewSyncProducer(brokersUrl, config)

	if err != nil {
		return nil, err
	}

	return conn, nil
}
// export PATH=$PATH:$GOPATH/bin:/usr/bin/go/bin
func agregarEnCola(topic string, message []byte) error {
	
	brokersUrl := []string{"my-cluster-kafka-bootstrap.kafka:9092"}
	fmt.Println("Adding to Worker...")
	producer, err := ConnectProducer(brokersUrl)
	fmt.Print(producer)
	if err != nil {
		return err
	}
	fmt.Println("efe?")
	defer producer.Close()
	msg := &sarama.ProducerMessage{
		Topic: topic,
		Value: sarama.StringEncoder(message),
	}

	fmt.Println(msg)

	fmt.Println("mensaje?")


	partition, offset, err := producer.SendMessage(msg)
	fmt.Println(producer.SendMessage(msg))
	print(err)
	if err != nil {

		fmt.Println("HuBO ERROR CHAVO")
		return err
	}

	fmt.Printf("Message is stored in topic(%s)/partition(%d)/offset(%d)\n", topic, partition, offset)
	return nil

}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	reflection.Register(s)
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func juego1(jugadores int) jugador {
	var winner jugador

	fmt.Println("Iniciando el juego 1 hay  +", jugadores, "  jugadores listos para jugar ")
	//var result int
	var numeros [300]jugador
	rand.Seed(time.Now().UnixNano())
	for f := 0; f < jugadores; f++ {

		result := rand.Intn(100)

		//ganador=  rand.Int()
		numeros[f].nombre = f
		numeros[f].punteo = result

	}
	punteoGanador := numeros[0].punteo
	var MejorJugador int
	for f := 0; f < len(numeros); f++ {

		if numeros[f].punteo > punteoGanador {
			punteoGanador = numeros[f].punteo
			MejorJugador = numeros[f].nombre

		}

	}

	fmt.Println("Ganador jugador", MejorJugador, "con un punteo de ", punteoGanador, "pts")
	winner.nombre = MejorJugador
	winner.punteo = punteoGanador

	return winner

}

type jugador struct {
	nombre int
	punteo int
}

func juego2(jugadores int) jugador {
	var winner jugador

	fmt.Println("Iniciando el juego 2  BLACK JACK hay  +", jugadores, "  jugadores listos para jugar ")
	//var result int
	var numeros [300]jugador
	rand.Seed(time.Now().UnixNano())
	for f := 0; f < jugadores; f++ {

		result := rand.Intn(14)

		//ganador=  rand.Int()
		numeros[f].nombre = f
		numeros[f].punteo = result

	}

	for f := 0; f < jugadores; f++ {

		result := rand.Intn(14)

		//ganador=  rand.Int()
		numeros[f].nombre = f
		numeros[f].punteo = result + numeros[f].punteo

	}

	punteoGanador := numeros[0].punteo
	var MejorJugador int

	var cont int

	if cont == 0 {
		for f := 0; f < jugadores; f++ {

			if numeros[f].punteo == 21 {
				punteoGanador = numeros[f].punteo
				MejorJugador = numeros[f].nombre
				fmt.Println("Ganador jugador", MejorJugador, "la suma de sus cartas suma ", punteoGanador, "...")
				winner.nombre = MejorJugador
				winner.punteo = punteoGanador

				break
				return winner
			}

		}

		if MejorJugador == 0 {

			cont = cont + 1
		}

	}
	if cont == 1 {
		for f := 0; f < jugadores; f++ {

			if numeros[f].punteo == 20 {
				punteoGanador = numeros[f].punteo
				MejorJugador = numeros[f].nombre
				fmt.Println("Ganador jugador", MejorJugador, "la suma de sus cartas suma ", punteoGanador, "...")
				winner.nombre = MejorJugador
				winner.punteo = punteoGanador

				break
				return winner
			}

		}
		if MejorJugador == 0 {

			cont = cont + 1
		}

	}
	if cont == 2 {

		for f := 0; f < jugadores; f++ {

			if numeros[f].punteo == 19 {
				punteoGanador = numeros[f].punteo
				MejorJugador = numeros[f].nombre
				fmt.Println("Ganador jugador", MejorJugador, "la suma de sus cartas suma ", punteoGanador, "...")
				winner.nombre = MejorJugador
				winner.punteo = punteoGanador

				break
				return winner
			}

		}
		if MejorJugador == 0 {

			cont = cont + 1
		}

	}
	if cont == 3 {

		for f := 0; f < jugadores; f++ {

			if numeros[f].punteo == 18 {
				punteoGanador = numeros[f].punteo
				MejorJugador = numeros[f].nombre
				fmt.Println("Ganador jugador", MejorJugador, "la suma de sus cartas suma ", punteoGanador, "...")
				winner.nombre = MejorJugador
				winner.punteo = punteoGanador

				break
				return winner
			}

		}
		if MejorJugador == 0 {

			cont = cont + 1
		}

	}

	if cont == 4 {

		for f := 0; f < jugadores; f++ {

			if numeros[f].punteo == 17 || numeros[f].punteo == 16 || numeros[f].punteo == 15 || numeros[f].punteo == 14 {
				punteoGanador = numeros[f].punteo
				MejorJugador = numeros[f].nombre
				fmt.Println("Ganador jugador", MejorJugador, "la suma de sus cartas suma ", punteoGanador, "...")
				winner.nombre = MejorJugador
				winner.punteo = punteoGanador

				break
				return winner

			}

		}
		if MejorJugador == 0 {

			cont = cont + 1
		}

	}

	return winner
}
func juego3(jugadores int) jugador {
	var winner jugador

	fmt.Println("Iniciando el juego 3 hay  +", jugadores, "  jugadores listos para jugar ")
	//var result int
	var numeros [300]float64
	rand.Seed(time.Now().UnixNano())
	for f := 0; f < jugadores; f++ {

		result := rand.Float64()

		//ganador=  rand.Int()

		numeros[f] = result

	}
	punteoGanador := numeros[0]
	var MejorJugador int
	for f := 0; f < jugadores; f++ {

		if numeros[f] < punteoGanador {
			punteoGanador = numeros[f]
			MejorJugador = f

		}

	}

	fmt.Println("Ganador jugador", MejorJugador, "con un punteo de ", punteoGanador, "pts")
	winner.nombre = MejorJugador
	winner.punteo = int(punteoGanador)

	return winner

}

/*

Juego 4

*/
func randInt(min int, max int) int {
	return min + rand.Intn(max-min)
}

// RandString genera una cadena aleatoria
func randomString(l int) string {
	bytes := make([]byte, l)

	for i := 0; i < l; i++ {

		bytes[i] = byte(randInt(65, 70))

	}
	return string(bytes)
}

func juego4(jugadores int) jugador {

	rand.Seed(time.Now().UTC().UnixNano())
	var winner jugador
	var punteos [300]jugador
	fmt.Println("Iniciando el juego 4 hay  +", jugadores, "  jugadores listos para jugar ")

	var numeros [100]string

	for f := 0; f < jugadores; f++ {

		result := randomString(10)

		numeros[f] = result

	}

	for f := 0; f < jugadores; f++ {

		//	fmt.Println(numeros[f])

		for alv := 0; alv < 10; alv++ {

			if numeros[f][alv] == 65 {
				punteos[f].nombre = f
				punteos[f].punteo = 50 + punteos[f].punteo

			}

			if numeros[f][alv] == 66 {
				punteos[f].nombre = f
				punteos[f].punteo = 40 + punteos[f].punteo

			}

			if numeros[f][alv] == 67 {
				punteos[f].nombre = f
				punteos[f].punteo = 30 + punteos[f].punteo

			}
			if numeros[f][alv] == 68 {
				punteos[f].nombre = f
				punteos[f].punteo = 20 + punteos[f].punteo

			}
			if numeros[f][alv] == 69 {
				punteos[f].nombre = f
				punteos[f].punteo = 10 + punteos[f].punteo

			}

		}

	}

	punteoGanador := punteos[0].punteo
	var MejorJugador int
	for f := 0; f < jugadores; f++ {

		if punteos[f].punteo > punteoGanador {
			punteoGanador = punteos[f].punteo
			MejorJugador = punteos[f].nombre

		}

	}

	fmt.Println("Ganador jugador", MejorJugador, "con un punteo de ", punteoGanador, "pts")

	winner.punteo = punteoGanador
	winner.nombre = MejorJugador
	fmt.Println()
	return winner
}
func juego5(jugadores int) jugador {
	var winner jugador
	var punteos [300]jugador
	cartas := [13]string{"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"}

	fmt.Println("Iniciando el juego 5 hay  +", jugadores, "  jugadores listos para jugar  ganara el que tenga mas letras K en su baraja ")
	//var result int
	var cartasjugador [100]string
	rand.Seed(time.Now().UnixNano())

	for cont := 0; cont < 10; cont++ {
		for f := 0; f < jugadores; f++ {

			result := rand.Intn(13)

			//ganador=  rand.Int()
			cartasjugador[f] = cartas[result] + cartasjugador[f]

		}

	}

	for f := 0; f < jugadores; f++ {

		for alv := 0; alv < 10; alv++ {

			if string(cartasjugador[f][alv]) == "K" {

				punteos[f].nombre = f
				punteos[f].punteo = punteos[f].punteo + 1

			}

		}

	}

	punteoGanador := punteos[0].punteo
	var MejorJugador int
	for f := 0; f < jugadores; f++ {

		if punteos[f].punteo > 2 {
			punteoGanador = punteos[f].punteo
			MejorJugador = punteos[f].nombre

		}

	}

	fmt.Println("Ganador jugador", MejorJugador, "con un punteo de ", punteoGanador, "pts")

	winner.punteo = punteoGanador
	winner.nombre = MejorJugador
	fmt.Println()
	return winner

}
// curl -O https://dl.google.com/go/go1.17.9.linux-amd64.tar.gz 
// sudo tar -xvf go1.17.9.linux-amd64.tar.gz  -C /usr/bin
// sudo chown -R root:root /usr/bin/go
// sha256sum go1.17.9.linux-amd64.tar.gz  $GOPATH/src/PRACTICA2_SOPES/jd/project
