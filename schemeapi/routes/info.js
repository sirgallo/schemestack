const express = require('express')
const router = express.Router()

const prestocli = require('../public/javascripts/prestoclient')

router.post('/', (req, res, next) => {
    console.log('Hi you made it to the info route!')
    prestocli.PrestoClient(req.body.presto, req.body.query)
        .then(schema => {
            entities = schema.data
            //console.log(entities)
            res.send({'data': entities})
        })
})

module.exports = router