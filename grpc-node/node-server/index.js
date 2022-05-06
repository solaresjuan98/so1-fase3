// RABBIT
const amqp = require('amqplib')

const rabbitSettings = {
    protocol: 'amqp',
    hostname: `${process.env.RABBIT_HOST}`,
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}



var PROTO_PATH = './proto/demo.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var demo_proto = grpc.loadPackageDefinition(packageDefinition);


const IniciarJuego = (call, callback) => {
    console.log(call.request.game)
    console.log(call.request.players)
    let jugadores
    let juego
    juego = call.request.game
    jugadores = call.request.players


    console.log(" Nombre del juego" + juego + "Numero de jugadores" + jugadores)
    switch (juego) {
        case "1":
            const fecha = new Date();



            const objeto = {
                game_id: 1,
                players: jugadores,
                game_name: "NumeroAleatorio1",
                winner: juego1(jugadores).nombre,
                queue: "Rabbit",
                Date_winner: fecha


            }
            console.log(objeto)
            agregarEnCola(objeto);

            break;
        case "2":
            const fecha2 = new Date();
            const objeto2 = {
                game_id: 2,
                players: jugadores,
                game_name: "Blackjack",
                winner: juego2(jugadores).nombre,
                queue: "Rabbit",
                Date_winner: fecha2
            }
            agregarEnCola(objeto2)


            break;
        case "3":
            const fecha3 = new Date();
            const objeto3 = {

                game_id: 3,
                players: jugadores,
                game_name: "NumeroAleatorio2",
                winner: juego3(jugadores).nombre,
                queue: "Rabbit",
                Date_winner: fecha3


            }
            agregarEnCola(objeto3)

            break;
        case "4":
            const fecha4 = new Date();

            const objeto4 = {

                game_id: 4,
                players: jugadores,
                game_name: "Letters",
                winner: juego4(jugadores).nombre,
                queue: "Rabbit",
                Date_winner: fecha4


            }
            agregarEnCola(objeto4)

            break;
        case "5":
            const fecha5 = new Date();

            const objeto5 = {
                game_id: 5,
                players: jugadores,
                game_name: "Cartas",
                winner: juego5(jugadores).nombre,
                queue: "Rabbit",
                Date_winner: fecha5


            }
            agregarEnCola(objeto5)

            break;
        default:
            break;
    }


    callback(null, {
        mensajeganador: "El ganador ha sido encolado"
    });

};

var server = new grpc.Server();
server.addService(demo_proto.ServicioNodejs.service, {
    IniciarJuego: IniciarJuego
});
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Servidor gRPC en el puerto 50051')
});



function juego1(jugadores) {

    console.log("Iniciando el juego 1: Hay" + jugadores + "listos para jugar")


    let numeros = []
    let mejorjugador
    let punteojugador

    console.log(parseInt(aleatorio))
    for (var i = 0; i < jugadores; i++) {

        var winner = new jugador(mejorjugador, punteojugador)


        var aleatorio = Math.random() * jugadores;
        winner.nombre = i
        winner.punteo = parseInt(aleatorio)
        numeros.push(winner)

    }




    let punteoGanador = numeros[0].punteo
    for (let i = 0; i < numeros.length; i++) {

        if (numeros[i].punteo > punteoGanador) {
            punteojugador = numeros[i].punteo
            mejorjugador = numeros[i].nombre

        }

    }


    console.log("Ganador jugador  " + mejorjugador + "    con un punteo de ", punteojugador, "   pts")
    winner.nombre = mejorjugador
    winner.punteo = punteojugador

    return winner




}

function juego2(jugadores) {

    console.log("Iniciando el juego 1 hay " + jugadores + "listos para jugar")


    let numeros = []
    let mejorjugador
    let punteojugador


    for (var i = 0; i < jugadores; i++) {

        var winner = new jugador(mejorjugador, punteojugador)


        var aleatorio = Math.random() * 14;
        winner.nombre = i
        winner.punteo = parseInt(aleatorio)
        numeros.push(winner)



    }


    for (var i = 0; i < jugadores; i++) {

        var winner = new jugador(mejorjugador, punteojugador)


        var aleatorio = Math.random() * jugadores;
        numeros[i].nombre = i
        numeros[i].punteo = parseInt(aleatorio) + numeros[i].punteo



    }

    let cont
    let punteoGanador = numeros[0].punteo
    for (let i = 0; i < numeros.length; i++) {

        if (numeros[i].punteo == 21) {
            punteojugador = numeros[i].punteo
            mejorjugador = numeros[i].nombre
            console.log("El ganador es:  " + mejorjugador + " con un punteo de ", punteojugador, " pts")
            winner.nombre = mejorjugador
            winner.punteo = punteojugador
            return winner;


        }
        cont = 1

    }


    if (cont == 1) {
        for (let f = 0; f < jugadores; f++) {

            if (numeros[f].punteo == 20) {
                punteojugador = numeros[f].punteo
                mejorjugador = numeros[f].nombre
                console.log("El ganador es: ", mejorjugador, "la suma de sus cartas suma ", punteojugador, "...")
                winner.nombre = mejorjugador
                winner.punteo = punteoGanador
                return winner
            }
            punteojugador = 0

        }
        if (punteojugador == 0) {

            cont = cont + 1
        }

    }
    if (cont == 2) {
        for (let f = 0; f < jugadores; f++) {

            if (numeros[f].punteo == 19) {
                punteojugador = numeros[f].punteo
                mejorjugador = numeros[f].nombre
                console.log("El ganador es: ", mejorjugador, "la suma de sus cartas suma ", punteojugador, "...")
                winner.nombre = mejorjugador
                winner.punteo = punteoGanador
                return winner
            }
            punteojugador = 0

        }
        if (punteojugador == 0) {

            cont = cont + 1
        }

    }
    if (cont == 3) {
        for (let f = 0; f < jugadores; f++) {

            if (numeros[f].punteo == 18) {
                punteojugador = numeros[f].punteo
                mejorjugador = numeros[f].nombre
                console.log("El ganador es: ", mejorjugador, "la suma de sus cartas suma ", punteojugador, "...")
                winner.nombre = mejorjugador
                winner.punteo = punteoGanador
                return winner

            }
            punteojugador = 0;

        }
        if (punteojugador == 0) {

            cont = cont + 1
        }

    } if (cont == 4) {
        for (let f = 0; f < jugadores; f++) {

            if (numeros[f].punteo == 17 || numeros[f].punteo == 16 || numeros[f].punteo == 15 || numeros[f].punteo == 14 || numeros[f].punteo == 13) {
                punteojugador = numeros[f].punteo
                mejorjugador = numeros[f].nombre
                console.log("Ganador jugador: ", mejorjugador, "la suma de sus cartas suma ", punteojugador, "...")
                winner.nombre = mejorjugador
                winner.punteo = punteoGanador
                return winner
                break

            }
            punteojugador = 0

        }
        if (punteojugador == 0) {

            cont = cont + 1
        }

    }




    return winner




}
function juego3(jugadores) {

    console.log("Iniciando el juego 3 hay " + jugadores + "listos para jugar")


    let numeros = []
    let mejorjugador
    let punteojugador

    console.log(parseInt(aleatorio))
    for (var i = 0; i < jugadores; i++) {

        var winner = new jugador(mejorjugador, punteojugador)


        var aleatorio = Math.random();
        winner.nombre = i
        winner.punteo = aleatorio
        numeros.push(winner)



    }




    punteoGanador = numeros[0].punteo
    for (let i = 0; i < numeros.length; i++) {

        if (numeros[i].punteo < punteoGanador) {
            punteojugador = numeros[i].punteo
            mejorjugador = numeros[i].nombre

        }

    }


    console.log("Ganador jugador  " + mejorjugador + "    con un punteo de ", punteojugador, "   pts")
    winner.nombre = mejorjugador
    winner.punteo = punteojugador

    return winner




}
function juego4(jugadores) {


    const generateRandomString = (num) => {
        const characters = 'ABCDE';
        let result1 = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result1;
    }


    console.log("Iniciando el juego 4 hay " + jugadores + "listos para jugar")


    let numeros = []
    let punteos = []
    let mejorjugador
    let punteojugador
    let punteoGanador


    for (var i = 0; i < jugadores; i++) {

        numeros[i] = generateRandomString(10)


    }

    for (let index = 0; index < jugadores; index++) {
        var winner = new jugador(0, 0)
        punteos.push(winner)
        for (let f = 0; f < 10; f++) {
            if (numeros[index][f] == "A") {

                console.log("A")
                punteos[index].nombre = index
                punteos[index].punteo = 50 + punteos[index].punteo

            }
            if (numeros[index][f] == "B") {

                console.log("B")

                punteos[index].nombre = index
                punteos[index].punteo = 40 + punteos[index].punteo

            }
            if (numeros[index][f] == "C") {

                console.log("c")
                punteos[index].nombre = index
                punteos[index].punteo = 30 + punteos[index].punteo;

            }
            if (numeros[index][f] == "D") {
                console.log("D")
                punteos[index].nombre = index
                punteos[index].punteo = 40 + punteos[index].punteo

            }
            if (numeros[index][f] == "E") {

                console.log("E")
                punteos[index].nombre = index
                punteos[index].punteo = 10 + punteos[index].punteo

            }

        }

    }



    punteoGanador = punteos[0].punteo
    console.log(punteos[0])
    for (let i = 0; i < numeros.length; i++) {

        if (punteos[i].punteo < punteoGanador) {
            punteojugador = punteos[i].punteo
            mejorjugador = punteos[i].nombre

        }

    }



    console.log("Ganador jugador  " + mejorjugador + " con un punteo de ", punteojugador, "   pts")
    winner.nombre = mejorjugador
    winner.punteo = punteojugador

    return winner

}
function jugador(nombre, punteo) {

    this.nombre = nombre;
    this.punteo = punteo;


}

function juego5(jugadores) {

    console.log("Iniciando el juego 5 hay " + jugadores + "  listos para jugar")


    let punteos = []
    let mejorjugador
    let punteojugador
    let cartas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    let cartasJugador = []


    for (let f = 0; f < 10; f++) {
        for (var i = 0; i < jugadores; i++) {

            var aleatorio = parseInt(Math.random() * 13);
            cartasJugador[i] = cartas[aleatorio] + cartasJugador[i]

        }
    }


    for (let index = 0; index < jugadores; index++) {
        var winner = new jugador(0, 0)
        punteos.push(winner)
        for (let f = 0; f < 10; f++) {
            if (cartasJugador[index][f] == "K") {

                punteos[index].nombre = index
                punteos[index].punteo = 1 + punteos[index].punteo

            }


        }

    }
    console.log(punteos)

    for (let i = 0; i < punteos.length; i++) {

        if (punteos[i].punteo >= 2) {
            punteojugador = punteos[i].punteo
            mejorjugador = punteos[i].nombre

        }

    }


    console.log("Ganador jugador  " + mejorjugador + "    con un punteo de ", punteojugador, "   pts")
    winner.nombre = mejorjugador
    winner.punteo = punteojugador

    return winner




}


async function agregarEnCola(ganador) {


    const queue = "cola_ganadores";

    try {

        const conn = await amqp.connect(rabbitSettings);

        console.log('Conexión creada ');

        const channel = await conn.createChannel();
        console.log('Canal creado');

        let res = await channel.assertQueue(queue);
        console.log('Cola creada');

        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(ganador)))
        console.log(`Ganador enviado a la cola ${queue}`)

    } catch (error) {
        console.log(`Error -> ${error}`);
    }
}