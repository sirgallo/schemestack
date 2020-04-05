const express = require('express')
const router = express.Router()
const Maria = require('../public/javascripts/mariadb')

router.get('/presto/:prestoId', (req, res, next) => {
    let prestoid = req.params.prestoId
    console.log('Presto ID: ', prestoid)
    console.log('Looking for Schema...please hold...')

    let query = '' + req.params.prestoid
})

module.exports = router