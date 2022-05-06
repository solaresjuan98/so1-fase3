const MongoClient = require('mongodb').MongoClient

class Config {

    constructor(){
        this.db = {};
        this.collection = [];
        //this.dbConnection = dbConnection();
    }

    dbConnection() {
        MongoClient.connect('mongodb://cche:cche12345@34.123.235.79:27017',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) return console.error(err)
            console.log('Connected to Database')
            // db = client.db('golangAPI')
            // collection = db.collection('users')
            this.db = client.db('logsMK')
            this.collection = this.db.collection('logs')
            
            // collection.find().toArray()
            // .then(results => {
            //     console.log(results)
            // }).catch(error => console.error(error))
            //console.log()
        })

    }

}


module.exports = Config;


// const MongoClient = require('mongodb').MongoClient
// let db = [];
// let collection;


// const dbConnection = async () => {
//     await MongoClient.connect('mongodb://cche:cche12345@34.70.59.238:27017',
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }, (err, client) => {
//             if (err) return console.error(err)
//             console.log('Connected to Database')
//             // db = client.db('golangAPI')
//             // collection = db.collection('users')
//             db = client.db('logsMK')
//             collection = db.collection('logs')
            
//             // collection.find().toArray()
//             // .then(results => {
//             //     console.log(results)
//             // }).catch(error => console.error(error))
//             //console.log()
//         })


    
// }

// module.exports = {
//     dbConnection,
//     db
// }


// const mongoose = require('mongoose');
// // process.env.DB_CNN_STRING

// const dbConnection = async () => {
//     try {


//         await mongoose.connect('mongodb://cche:cche12345@34.70.59.238:27017/', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             //useCreateIndex: true
//         })

//         console.log('Db conectada :l')
//         //mongoose
//         // mongoose.connection.db.listCollections().toArray((err, names) => {
//         //     console.log(names);
//         // })

//     } catch (error) {
//         throw new Error(error)
//     }
// }

// module.exports = {
//     dbConnection
// }