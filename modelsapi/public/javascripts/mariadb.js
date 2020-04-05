const mysql = require('mysql2')

class MariaDB {

    constructor() {
        this.connection = mysql.createConnection({
            host: 'mysql',
            port: 3306,
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