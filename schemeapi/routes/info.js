const express = require('express')
const router = express.Router()

const prestocli = require('../public/prestoclient')

router.post('/', (req, res, next) => {
    console.log('Hi you made it to the info route!')
    prestocli.PrestoClient(req.body.presto, req.body.query)
        .then(schema => {
            entities = schema.data[0]
            res.send({'status': 'success','data': entities})
        })
        .catch(err => {
            res.send({'status': err})
            console.log(err)
        })
})

module.exports = router