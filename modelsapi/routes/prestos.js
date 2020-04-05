const express = require('express')
const router = express.Router()

const Maria = require('../public/javascripts/mariadb')
const presto = require('../models/prestoinst')
const fetchschema = require('../public/javascripts/fetchschema')
const mapschema = require('../public/javascripts/mapschema')

router.get('/', (req, res, next) => {
    console.log('Preparing to fetch prestos...')
    const query = 'select * from `prestocreds`'

    const maria = new Maria.MariaDB()
    maria.query(query)
        .then(prestos => {
            console.log('Successfully grabbed rows...')
            console.log('Prestos: ')
            console.log(JSON.parse(JSON.stringify({'prestos': prestos})))
            maria.close()
                .then(() => {
                    res.send(JSON.parse(JSON.stringify({'prestos': prestos})))
                })
        })
        .catch(err => {
            throw err
        })
})

router.get('/:prestoId', (req, res, next) => {
    console.log('Hi! Still working on this...')
})

router.post('/create', (req, res, next) => {

    console.log('Preparing to create new instance...')

    //  object for presto credentials
    let Presto = presto.Presto
    Presto.host = req.body.hostname
    if (req.body.port != Presto.port)
        Presto.port = req.body.port
    Presto.catalog = req.body.catalog
    Presto.schema = req.body.schema
    Presto.user = req.body.user

    //  we need to insert our instance into the database
    let inspresto = "insert into `prestocreds` (`host`, `port`, `catalog`, `schema`, `user` ) values ('" +
        Presto.host + "', " +
        Presto.port + ", '" +
        Presto.catalog + "', '" +
        Presto.schema + "', '" +
        Presto.user + "');"

    console.log(inspresto)
    const maria = new Maria.MariaDB()
    maria.insert(inspresto, 'presto instance')
        .then(() => {
            maria.close()
                .then(() => {
                    console.log('Preparing to insert schema...')
                    //  need to query Presto information_schema
                    //  this will return all of the information needed on the tables and columns
                    let schemaquery = "select * from columns where table_schema = '" + Presto.schema + "'"
                    //  use fetchschema to get schema from prestoclient api
                    fetchschema.fetchSchema({url: Presto.host,
                        port: Presto.port,
                        catalog: Presto.catalog,
                        schema: 'information_schema',
                        user: Presto.user}, schemaquery)
                            .then(data => {
                                const entities = data.data
                                //  map the schema
                                mapschema.MapSchema(entities)
                                    .then(() => {
                                        console.log('we made it')
                                        res.send({'status': 'ok'})
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            })
                })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router