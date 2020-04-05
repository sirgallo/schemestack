const Maria = require('./mariadb')

const MapSchema = (data) => {

    //  go through json response for current schema and build insert query
    let insertschema = "insert into `schemas` values "
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if (j == data[i].length - 1 && i == data.length - 1)
                insertschema += data[i][j] + "');"
            else if (j == data[i].length - 1)
                insertschema += data[i][j] + "'), "
            else if (j == 0)
                insertschema += "('" + data[i][j] + "', '"
            else if (j == 3)
                insertschema += data[i][j] + "', "
            else if (j == 4)
                insertschema += data[i][j] + ", '"
            else
                insertschema += data[i][j] + "', '"
        }
    }

    console.log('This is the query to insert the new schema...')
    console.log(insertschema)

    return new Promise((resolve, reject) => {
        const maria = new Maria.MariaDB()
        maria.insert(insertschema, 'schema')
            .then(() => {
                maria.close()
                    .then(() => {
                        resolve()
                })
                .catch(err => {
                    return reject(err)
                })
            .catch(err => {
                return reject(err)
            })
        })
    })
}

module.exports.MapSchema = MapSchema