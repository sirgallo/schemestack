const mysql = require('mysql2')
/*
 *  class for handling data operations on MariaDB backend database
 *  TEST
 *  let's make these async
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

    async query(sql, args) {
        return await new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err)
                resolve(rows)
            })
        })
    }

    async insert(sql, name, args) {
        return await new Promise((resolve, reject) => {
            this.connection.query(sql, args, err => {
                if (err)
                    return reject(err)
                console.log(name + ' inserted into database successfully')
                resolve()
            })
        })
    }

    async delete(sql, args) {
        return await new Promise((resolve, reject) => {
            this.connection.query(sql, args, err => {
                if(err)
                    return reject(err)
                console.log('Entry deleted successfully from database')
                resolve()
            })
        })
    }

    async close() {
        return await new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err)
                resolve()
            })
        })
    }
}

module.exports.MariaDB = MariaDB