const queryBuilder = require('../public/querybuilder')
const querybuilder = queryBuilder.queryBuilder

const CheckQuery = async (req) => {
    let query = ''
    if(req.body.hasOwnProperty('columns') && req.body.hasOwnProperty('table'))
        query = await querybuilder(req)
    else
        query = req.body.query
    return query 
}

module.exports.CheckQuery = CheckQuery