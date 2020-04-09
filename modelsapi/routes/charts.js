const express = require('express')
const router = express.Router()

const chart = require('../models/chartinst')
const Maria = require('../public/mariadb')
const fetchdata = require('../public/fetchdata')

router.get('/', (req, res, next) => {
    console.log('Getting all charts! Wait...')
    let query = "select * from `charts`"
    maria.query(query)
        .then(rows => {
            maria.close()
                .then(() => {
                    fetchdata.fetchData(prestoinst, query)
                        .then(data => {
                            let resdata = data.data
                        })
                })
        })
        .catch(err => {
            console.log(err)
            res.send({'status': 'failure', 'message': 'Unable to retrieve charts'})
        })
})

router.post('/chart', (req, res, next) => {
    console.log('Preparing to retrieve your Chart...hold on...')
    let Chart = chart.Chart
    Chart.name = req.body.name
    Chart.query = req.body.query
    Chart.type = req.body.type

    let query = "select * from `chart` where `chart_name` = '" +
        Chart.name + "' and `chart_type` = '" +
        Chart.type + "' and `chart_query` = '" +
        Chart.query + "' limit 1;"

    const maria = new Maria.MariaDB()
    maria.query(query)
        .then(row => {
            maria.close()
                .then(() => {
                    res.send({'chart': row})
                })
        })
        .catch(err => {
            console.log(err)
            res.send({'status': 'failure', 'message': 'Unable to find that chart'})
        })
})

router.post('/create', (req, res, next) => {
    console.log('Preparing to insert your Chart into the database...wait...')
    let Chart = chart.Chart
    Chart.name = req.body.alias
    Chart.query = req.body.query
    Chart.type = req.body.type
    Chart.prestoid = req.body.p_id
    console.log(req.body.alias)
    console.log(req.body.p_id)

    let query = "insert into `charts` (`presto_id`, `chart_alias`, `chart_query`, `chart_type`) values (" +
        Chart.prestoid  + ", '" +
        Chart.name + "', '" +
        Chart.query + "', '" +
        Chart.type + "');"
    console.log(query)

    const maria = new Maria.MariaDB()
    maria.insert(query, 'chart')
        .then(() => {
            console.log('Your Chart was inserted Successfully!')
            maria.close()
                .then(() => {
                    res.send({'status': 'success', 'message': 'Chart successfully created!'})
                })
        })
        .catch(err => {
            console.log(err)
            res.send({'status': 'failure', 'message': 'Hmm we had a problem creating that chart'})
        })
})

module.exports = router