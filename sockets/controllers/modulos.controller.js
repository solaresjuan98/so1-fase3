const { request, response } = require("express");
const MongoClient = require('mongodb').MongoClient

const obtenerModuloRam = async (req = request, res = response) => {
    let db;
    let collection;

    await MongoClient.connect('mongodb://cche:cche12345@34.67.155.126:27017',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) return console.error(err)
            console.log('Connected to Database')


            db = client.db('logsMK')
            collection = db.collection('logs')

            collection.find().sort({ fecha: -1 }).limit(5).toArray()
                .then(results => {
                    //results
                    return res.json(results)
                    //console.log(results)
                }).catch(error => console.error(error))
        
        })


}

const obtenerRam = () => {
    MongoClient.connect('mongodb://cche:cche12345@34.67.155.126:27017',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) return console.error(err)
            console.log('Connected to Database')


            db = client.db('logsMK')
            collection = db.collection('logs')

            collection.find().toArray()
                .then(results => {
                    //results
                    return results;
                    // return res.json(results)
                    //console.log(results)
                }).catch(error => console.error(error))

        })
}

const obtenerModuloProcesos = async (req = request, res = response) => {

    try {

        return res.status(200).json({
            mensaje: 'Modulo de procesos'
        })

    } catch (error) {
        return res.status(200).json({
            mensaje: 'Error'
        })
    }

}

module.exports = {
    obtenerModuloRam,
    obtenerModuloProcesos,
    obtenerRam
}