const MongoClient = require('mongodb').MongoClient
let db;
let collection;

class Ram {


    constructor() {

        this.modulo_ram = []

    }

    obtenerModuloDB() {

        MongoClient.connect('mongodb://cche:cche12345@34.67.155.126:27017',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, client) => {
                if (err) return console.error(err)
                //console.log('Connected to Database')

                db = client.db('logsMK')
                collection = db.collection('logs')

                collection.find().sort({fecha: -1}).limit(100).toArray()
                    .then(results => {
                        //console.log(results)
                        console.log(results.length)
                        //console.log(results.slice(0, 3))
                        this.modulo_ram = [...results.slice(0, 100)]

                        //this.modulo_ram = [...results]
                    }).catch(error => console.error(error))

            })
        
            //console.log(this.modulo_ram)
        return this.modulo_ram

    }

}


module.exports = Ram;