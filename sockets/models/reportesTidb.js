const { dbConnection } = require("../database/mysql");

class ReportesTidb {


    constructor() {
        this.reportePrueba = [];
        this.connection = dbConnection;
    }

    getReporte() {
        return this.reportePrueba;
    }

    obtenerTidb() {

        this.connection.query("SELECT * FROM ganadores", function (err, result) {
            
            try {
                console.log('Get')
                this.reportePrueba = [...result];
                //console.log(this.reportePrueba)
                return this.reportePrueba
                //console.log(this.reportePrueba)
            } catch (error) {
                console.log(err)
            }

          })


        return this.reportePrueba;
        
    }
}

module.exports = ReportesTidb