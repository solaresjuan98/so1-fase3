
const Ram = require("./ram");
const redis = require('redis');
const mysql = require('mysql');
// TIDB
const dbConnection = mysql.createConnection({
    host: "34.135.246.61",
    port: "4000",
    user: "root",
    password: "",
    database: "Fase3"
});

// Log any errors connected to the db
dbConnection.connect(function (err) {
    if (err) console.log(err)
})
let dataTest = []
let isInitTest = false;

let userData = [];



// // redis
const url = `redis://34.70.171.132:6379`;

const client = redis.createClient({
    url,
});


// client.connect();


const connectDB = async () => {
    await client.connect();
    console.log('redis connected')

    // const a = await client.sendCommand(['lrange', 'resultados', 0, 2])
    // console.log(a);



}


connectDB();


/*
    Reportes con datos de Redis y Tidis:
        ● Últimos 10 juegos.
        ● Los 10 mejores jugadores.
        ● Estadísticas del jugador en tiempo real

*/

// 10 Mejores jugadores
let top10 = [];
let isInitTop10 = false;

let dataRedis = [];
let redisReady = false;

let top10RedisReady = false;

class Sockets {

    constructor(io) {

        this.io = io;
        this.moduloRam = new Ram();
        //this.reportesTidb = new  ReportesTidb(); 
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {

            console.log('cliente conectado');

            socket.emit('mensaje-bienvenida', {
                msg: 'Bienvenido al servidor',
                fecha: new Date()
            })


            socket.emit('mensaje-tidb', {
                mensaje: 'a',
                //data: this.reportesTidb.getReporte()
            })

            //
            if (!isInitTest) {

                dbConnection.query("SELECT * FROM ganadores limit 10")
                    .on('result', function (data) {
                        //console.log(data);
                        dataTest.push(data)
                    }).on('end', function () {
                        socket.emit('ultimos-10ganadores', dataTest)
                    })

                isInitTest = true;
            } else {
                //console.log(data)
                socket.emit('ultimos-10ganadores', dataTest)
            }


            // ● Los 10 mejores jugadores.
            if (!isInitTop10) {

                dbConnection.query("select winner, count(*) as veces from ganadores group by winner limit 10")
                    .on('result', function (data) {
                        //console.log('top 10 cargado...')
                        console.log(data)
                        top10.push(data)
                    }).on('end', function () {
                        socket.emit('top10-jugadores', top10)
                    })

                isInitTop10 = true;
            } else {
                console.log('top 10 cargado...')
                socket.emit('top10-jugadores', top10)
            }

            // ● Estadisticas en tiempo real

            socket.on('evento', function (data, callback) {
                console.log(data);
                userData = [];
                if (data.user) {
                    dbConnection.query(`select game_name, count(*) as times from ganadores where winner = "${data.user}" group by game_name`)
                        .on('result', function (data) {
                            userData.push(data)
                            //console.log(data)
                        }).on('end', function () {
                            socket.emit('realtimeplayer-statistics', userData)
                        })
                }


            });
            // Redis

            // * Reporte 1
            let resultados_finales = [];
            if (!redisReady) {

                try {
                    //obtener ultimos 10 juegos (traen una fila con "0"), por eso se piden ultimos 20 registros
                    let resultados = await client.sendCommand(['lrange', 'resultados', 0, 19]);
                    // ya que traen una fila "0" se obtienen solo los que si son resultados

                    //recorre 20 registros
                    for (let i = 0; i < resultados.length; i++) {
                        //los resultados vienen en fila impar
                        if (i % 2 != 0) {
                            //agregar al arreglo
                            resultados_finales.push(JSON.parse(resultados[i]));
                        }
                    }

                    console.log(resultados_finales);
                    console.log('last10-gamesredis loaded')
                    socket.emit('last10-gamesredis', resultados_finales)
                    //redisReady = true;
                } catch (error) {
                    console.log('Error :(');
                    socket.emit('last10-gamesredis', resultados_finales)
                }

            } else {
                console.log('ultimos 10 juegos redis')
                socket.emit('last10-gamesredis', resultados_finales)
            }



            // * Reporte 2 
            let top_10 = [];
            if (!top10RedisReady) {

                try {
                    let resultados = await client.sendCommand(['lrange', 'resultados', 0, -1]);
                    // ya que traen una fila "0" se obtienen solo los que si son resultados
                    let resultados_finales = [];
                    //recorrer registros con "0"
                    for (let i = 0; i < resultados.length; i++) {
                        //los resultados vienen en fila impar 
                        if (i % 2 != 0) {
                            //agregar al arreglo de resulatod finales
                            resultados_finales.push(resultados[i]);
                        }
                    }
                    // obtener el id de los gandores
                    let ids_ganadores = [];
                    //recorrer resultados
                    resultados_finales.forEach(resultado => {
                        //pasar string a JSON
                        let result = JSON.stringify(resultado);
                        // separar campos por comas
                        let result_comas = result.split(",");
                        // obtener id, viene en 4ta posision
                        let winner_id = result_comas[3].split(":");
                        // agregar al arreglo
                        ids_ganadores.push(parseInt(winner_id[1]));
                    });

                    // obtener número de veces que se repite cada id
                    var indices = new Array(getMaxOfArray(ids_ganadores) + 1); //indices con todos los números hasta el más alto
                    indices.fill(0); //rellenar arreglo
                    //for para recorrer cada posicion de indices
                    for (var i = 0; i < indices.length; i++) {
                        //recorrer arreglo con los ids de los ganadores
                        for (var j = 0; j < ids_ganadores.length; j++) {
                            // sumar 1 a la posicion del arreglo en el que se encuentre repetición
                            if (i == ids_ganadores[j]) {
                                indices[i] = indices[i] + 1;
                            }
                        }
                    }

                    //ordenar la lista de id del menor a mayor
                    ids_ganadores = ids_ganadores.sort(function (a, b) {
                        return a - b;
                    });

                    //eliminar repetidos
                    ids_ganadores = ids_ganadores.filter((item, index) => {
                        return ids_ganadores.indexOf(item) === index;
                    })

                    //crear arreglo de objetos => id_ganador, no. veces ganadass
                    let ganadores_conteo = [];
                    let contador = 0; //para recorrer arreglo de ids
                    //recorrer arreglo con repeticiones del id de ganador
                    indices.forEach(rep => {
                        //hay números con 0 repeticiones, omitir esos
                        if (rep != 0) {
                            //el arreglo de id_gandores esta ordenado del menor a mayor
                            //el de indices con el de número de repeticiones igual
                            //ambos tienen el mismo tamaño  
                            //solo le asignamos el id y el número de repeticioens
                            let ganador_conteo = { "id": ids_ganadores[contador], "conteo": rep };
                            ganadores_conteo.push(ganador_conteo); //agregar al arreglo
                            contador++; //sumar 1 al contador
                        }
                    });

                    //ordenar arreglo de ganadores por el número de repeticones, de mayor a menor
                    let dataLen = ganadores_conteo.length;
                    for (let i = 0; i < dataLen; i++) {
                        for (let j = 0; j < dataLen; j++) {
                            if (j + 1 !== dataLen) {
                                if (ganadores_conteo[j].conteo < ganadores_conteo[j + 1].conteo) {
                                    let swapElement = ganadores_conteo[j + 1];
                                    ganadores_conteo[j + 1] = ganadores_conteo[j];
                                    ganadores_conteo[j] = swapElement;
                                }
                            }
                        }
                    }

                    //obtener los primeros 10 (10 jugadores que más han ganado)
                    let contador2 = 0;

                    ganadores_conteo.forEach(ganador => {
                        if (contador2 < 10) {
                            top_10.push(ganador);
                        }
                        contador2++;
                    });
                    //console.log(top_10);
                    console.log('top10-redis loaded')
                    socket.emit('top10-redis', JSON.parse(top10));
                } catch (error) {
                    console.log('Error :v');
                    socket.emit('top10-redis', top_10);
                }

                //res.send(top_10);
            } else {
                socket.emit('top10-redis', top10);
            }


            // ===========================================
            socket.on('mensaje-to-server', (data) => {
                console.log(data);

                this.io.emit('mensaje-from-server', data);
            });

        });
    }


}

//obtener número máximo de un array
function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

module.exports = Sockets;