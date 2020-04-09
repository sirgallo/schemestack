const mysql = require('mysql2')
/*
 *  class for handling data operations on MariaDB backend database
*/
class MariaDB {

    constructor() {
        //  use host supplied by docker-compose, in this case defined as mysql
        this.connection = mysql.createConnection({
            host: 'mysql',
            port: 8085,
            user: 'schemeuser',
            password: 'userscheme',
            database: 'schememodels'
        })
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err)
                resolve(rows)
            })
        })
    }

    insert(sql, name, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, err => {
                if (err)
                    return reject(err)
                console.log(name + ' inserted into database successfully')
                resolve()
            })
        })
    }

    delete(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, err => {
                if(err)
                    return reject(err)
                console.log('Entry deleted successfully from database')
                resolve()
            })
        })
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err)
                resolve()
            })
        })
    }
}

module.exports.MariaDB = MariaDB