const express = require('express')
const router = express.Router()

const prestocli = require('../public/prestoclient')
const queryBuilder = require('../public/querybuilder')
const querybuilder = queryBuilder.queryBuilder
const tableBuilder = require('../public/tablebuilder')
const tablebuilder = tableBuilder.tableBuilder

router.post('/', (req, res, next) => {
    console.log('Hi you made it to the query route!')
    let query = querybuilder(req)

    prestocli.PrestoClient(req.body.presto, query)
        .then(data => {
            console.log('returned from prestoclient!')
            if(data.hasOwnProperty('message')){
                console.log(data.message)
                let message = data.message
                console.log(message)
                res.json({'message': message, 'table': '-', 'query': query})
            }
            else {
<<<<<<< HEAD
                let table = tablebuilder(data)

=======
                let table = '<div class="card" style="overflow-x:auto;"><table class="table"><thead class="thead-dark"><tr>'
                for(let i = 0; i < data.columns.length; i++)
                    table += '<th scope="col">' + data.columns[i].name + '</th>'
                table += '</tr></thead><tbody>'
                for(let i = 0; i < data.data.length; i++) {
                    table += '<tr>'
                    for(let j = 0; j <data.data[i].length; j++) {
                        table += '<td>' + data.data[i][j] + '</td>'
                    }
                    table += '</tr>'
                }
                table += '</tbody></table></div>'
                console.log('This is the data length: ')
                console.log(data.data.length)
>>>>>>> 2e2d782ff1b4a2ebbbd4d4971eadf5b5ea7c2259
                res.json({'message': 'success', 'table': table, 'query': query})
            }
        })
        .catch(err => {
            res.json({'status': err})
            console.log(err)
        })
})

module.exports = router