const express = require('express')
const router = express.Router()
const Maria = require('../public/mariadb')

router.post('/schema', (req, res, next) => {

    //  query for saved schema in database
    let query = "select `table_name`, `column_name`, `ordinal_position`, `data_type` from `schemas` " +
        "where `table_catalog` = '" + req.body.catalog + "' and " +
        "`table_schema` = '" + req.body.schema + "';"

    console.log('Query for Schema: ', query)
    console.log('Looking for Schema...please hold...')

    const maria = new Maria.MariaDB()
    maria.query(query)
        .then(schema => {
            console.log('schema: ')
            console.log(JSON.parse(JSON.stringify({'schema': schema})))
            maria.close()
                .then(() => {

                    let schemaJSON = JSON.parse(JSON.stringify(schema))
                    // building the response, will contain {tables:[..arrayof{'name': str, 'columns':[..arrayof{'name': str, 'position': int, 'type': str}]}]}
                    let clmname = ''
                    let clmpos = ''
                    let clmtype = ''
                    let tblname = ''
                    let tblclms = []
                    let tables = []
                    for(let i = 0; i <schemaJSON.length; i++) {
                        if(schemaJSON[i].ordinal_position == 1) {
                            tblname = schemaJSON[i].table_name
                            tblclms = []
                        }
                        clmname = schemaJSON[i].column_name
                        clmpos = schemaJSON[i].ordinal_position
                        clmtype = schemaJSON[i].data_type
                        tblclms.push({'name': clmname, 'position': clmpos, 'type': clmtype})
                        if(i == schemaJSON.length - 1 || schemaJSON[i + 1].ordinal_position == 1) {
                            tables.push({'name': tblname, 'columns': tblclms})
                        }
                    }
                    console.log('sending constructed Schema JSON...')
                    //res.send(JSON.parse(JSON.stringify({'schema': {'tables': tables, 'columns': columns}})))
                    res.send(JSON.parse(JSON.stringify({'tables': tables})))
                })
        })
        .catch(err => {
            throw err
        })
})

module.exports = router