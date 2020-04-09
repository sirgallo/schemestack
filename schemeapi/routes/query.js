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
                let table = tablebuilder(data)
                res.json({'message': 'success', 'table': table, 'query': query})
            }
        })
        .catch(err => {
            res.json({'status': err})
            console.log(err)
        })
})

module.exports = router