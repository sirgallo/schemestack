const express = require('express')
const router = express.Router()

const prestocli = require('../public/prestoclient')

router.post('/', (req, res, next) => {
    console.log('Hi you made it to the info route!')
    prestocli.PrestoClient(req.body.presto, req.body.query)
        .then(schema => {
            entities = schema.data[0]
            //console.log(entities)
            res.send({'status': 'success','data': entities})
        })
        .catch(err => {
            console.log(err)
            res.send({'status': err})
        })
})

module.exports = router