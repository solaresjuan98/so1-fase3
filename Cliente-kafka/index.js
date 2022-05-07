const express = require('express')

const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  next();
});

app.use(cors());

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

const toDos = [
  {
    id: 1,
    done: false,
    desc: 'Tarea numero 1'
  },
  {
    id: 2,
    done: false,
    desc: 'Tarea numero 2'
  },
  {
    id: 3,
    done: false,
    desc: 'Tarea numero 3'
  }
]

// app.get('/getToDos', (req, res) => {
//   console.log('Enviando tareas');
//   res.json(toDos)
// });

const repl = require('repl');
const grpc = require('grpc')

const PROTO_PATH = __dirname + '/proto/example.proto'
const hello_proto = grpc.load(PROTO_PATH).example
/*
function call(user) {

  alv="hola"
  alv2="hola2"
  alv3=alv+","+alv2
  const client = new hello_proto.Greeter('34.125.81.73:50555', grpc.credentials.createInsecure())
  client.sayHello({name:alv3}, function(err, res){
    console.log(res)
  })
}

function eval(name, ctx, filename, callback) {
  callback(null, call(name));
}

repl.start({prompt: 'name> ', eval: eval});
*/
app.post('/juego', (req, res) => {
  let { game_id, players } = req.body
  const r = process.env.HOST;
  const ruta = r+':50555';

    
    console.log(req.body)
      alv3=game_id+","+players
      const client = new hello_proto.Greeter(ruta, grpc.credentials.createInsecure())
      client.sayHello({name:alv3}, function(err, res){
        console.log(res)
      })



return res.json({  mensaje:"holaaaaaaaaaaaa "+res.message})


});

app.get('/', (req, res) => {
  


 res.json("holeeeeea")


});

app.listen(5000);
console.log('server oks');


