
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: "34.69.64.161",
  port: "4000",
  user: "root",
  password: "",
  database: "sopes1P2"
});


// dbConnection.connect(() => {
//   console.log('connected')
// })

// module.exports = { dbConnection }