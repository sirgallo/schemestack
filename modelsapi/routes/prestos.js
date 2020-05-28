const express = require('express')
const router = express.Router()

const Maria = require('../public/mariadb')
const presto = require('../models/prestoinst')
const fetchschema = require('../public/fetchschema')
const mapschema = require('../public/mapschema')

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
                    res.status(200).send(JSON.parse(JSON.stringify({'prestos': prestos})))
                })
        })
        .catch(err => {
            console.log(err)
            res.send({'status': 'failure', 'message': 'Hmm looks like we ran into an issue'})
        })
})

router.post('/presto', (req, res, next) => {
    console.log('Preparing to fetch Presto with Id: ' + req.body.prestoid)
    const query = 'select * from `prestocreds` where id = ' + req.body.prestoid

    const maria = new Maria.MariaDB()
    maria.query(query)
        .then(presto => {
            console.log('Successfully got instance...')
            console.log('Instance: ')
            console.log(JSON.parse(JSON.stringify({'presto': presto})))
            maria.close()
                .then(() => {
                    res.send(JSON.parse(JSON.stringify({'presto': presto})))
                })
        })
        .catch(err => {
            console.log(err)
            res.send({'status': 'failure', 'message': 'Hmm looks like we could not find that presto instance...'})
        })
})

router.post('/delete', (req, res, next) => {
    console.log('Preparing to delete Presto Entry')
    let deleteschema = "delete from `schemas` where `table_catalog` = '" +
        req.body.catalog + "' and `table_schema` = '" +
        req.body.schema + "'"
    let deletepresto = "delete from `prestocreds` where `id` = " + req.body.prestoid
    let deletecharts = "delete from `charts` where `presto_id` = " + req.body.prestoid
    let deletequeries = "delete from `queries` where `presto_id` = " + req.body.prestoid
    
    const maria = new Maria.MariaDB()
    maria.delete(deletecharts)
        .then(() => {
            maria.delete(deletepresto)
                .then(() => {
                    maria.delete(deleteschema)
                        .then(() => {
                            maria.delete(deletequeries)
                                .then(() => {
                                    maria.close()
                                        .then(() => {
                                            console.log('successfully deleted Instance and associated Schema')
                                            res.send({'status': 'success'})
                                        })
                                })
                        })
                })
        })
        .catch(err => {
            console.log(err)
            res.send({'status': 'failure', 'message': 'Something went wrong on our end'})
        })
})

router.post('/create', (req, res, next) => {
    console.log('Preparing to create new instance...')

    //  object for presto credentials
    let Presto = presto.Presto
    Presto.alias = req.body.alias
    Presto.host = req.body.hostname
    if (req.body.port != Presto.port)
        Presto.port = req.body.port
    Presto.catalog = req.body.catalog
    Presto.schema = req.body.schema
    Presto.user = req.body.user

    //  we need to insert our instance into the database
    let inspresto = 'insert into `prestocreds` (`alias`, `host`, `port`, `catalog`, `schema`, `user` ) values ("' +
        Presto.alias + '", ' + "'" +
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
                    fetchschema.fetchSchema({host: Presto.host,
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
                                        res.send({'status': 'success'})
                                    })
                            })
                })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router