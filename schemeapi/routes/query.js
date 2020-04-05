const express = require('express')
const router = express.Router()

const prestocli = require('../public/javascripts/prestoclient')

router.post('/', (req, res, next) => {
    console.log('Hi you made it to the query route!')
    prestocli.PrestoClient(req.body.prestoinst, req.body.query)
        .then(data => {
            res.json(data)
        })
})

module.exports = router