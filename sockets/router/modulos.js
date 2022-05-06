const { Router } = require('express');
const router = Router();
const redis = require('redis');

// const url = `redis://35.192.211.93:6379`;

// const client = redis.createClient({
//     url,
// });
// const connectDB = async () => {
//     await client.connect();
//     console.log('connected XD')

// }


//connectDB();


router.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'hola'
    })
})

// router.get('/test', (req, res) => {
//     console.log('XdXd')
//     client.lRange('resultados', 0, -1, function (err, reply) {
//         console.log(reply); // ['angularjs', 'backbone']
//     });

//     res.status(200).json({
//         mensaje: 'xd'
//     })
// });

module.exports = {
    router,
}