
const redis = require('redis');
const url = `redis://35.192.211.93:6379`;

const client = redis.createClient({
    url,
});

//client.connect();


const connectDB = async () => {
    await client.connect();
    console.log('connected XD')
}

// client.on('error', (error) => {
//     console.log(`Redis error ${error}`)
// })

// client.on('connect', (error) => {
//     console.log(`-> Redis error ${error}`)
// })

connectDB();