const express = require('express')
const router = express.Router()

const saved = require('../models/queryinst')
const Maria = require('../public/mariadb')
const fetchdata = require('../public/fetchdata')

router.post('/', (req, res, next) => {
    console.log('Getting all saved queries! Wait...')
    let query = "select * from `queries` where `user_id` = " + req.body.userid
    
    const maria = new Maria.MariaDB()
    maria.query(query)
        .then(queries => {
            //console.log(JSON.parse(JSON.stringify(queries)))
            console.log('...Got them.')
            maria.close()
                .then(() => {
                    res.send(JSON.parse(JSON.stringify({'queries': queries})))
                })
        })
        .catch(err => {
            res.send({'status': 'failure', 'message': 'unable to retrieve query'})
        })
})

router.post('/delete', (req, res, next) => {
    console.log('Preparing to delete Saved Query')
    let deletequery = "delete from `queries` where `id` = " + req.body.queryid +
        "and `user_id = " + req.body.userid

    const maria = new Maria.MariaDB()
    maria.delete(deletequery)
        .then(() => {
            maria.close()
                .then(() => {
                    console.log('Successfuly deleted Saved Query')
                    res.send({'status': 'success'})
                })
        })
        .catch(err => {
            console.log(err)
            res.send({'status': 'failure', 'message': 'Something went wrong on our end'})
        })
})

router.post('/create', (req, res, next) => {
    console.log('Preparing to save new query...')
    
    let Query = saved.Query
    Query.userid = req.body.userid
    Query.prestoid = req.body.p_id
    Query.name = req.body.alias
    Query.query = req.body.query

    let query = "insert into `queries` (`user_id`, `presto_id`, `query_alias`, `query_sql`) values (" +
        Query.userid + ", " +
        Query.prestoid + ", '" +
        Query.name + "', '" +
        Query.query + "');"
    console.log(query)

    const maria = new Maria.MariaDB()
    maria.insert(query, 'saved query')
        .then(() => {
            console.log('Your query was inserted successfully!')
            maria.close()
                .then(() => {
                    res.send({'status': 'success', 'message': 'Query successfully added!'})
                })
        })
        .catch(err => {
            console.log(err)
            res.send({'status': 'failure', 'message': 'Hmm seems there was an issue saving that query'})
        })
})

module.exports = router