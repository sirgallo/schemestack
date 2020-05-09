const fetch = require('node-fetch')

/*
 *  required for interacting with the presto cluster
 *  -> need route for api
 *  -> cont required for extended queries following 'nextUri'
*/
const endpoint = '/v1/statement'
const cont = {
    method: 'GET',
}

/*
 *  function for Presto Client REST API, will handle all requests and responses
 *  to a specified Presto Cluster with a specified query string
*/
const PrestoClient = async (prestoinst, query) => {
    //  return data
    let data = {
        columns: [],
        data: []
    }

    //  define the url, the host with the port, and http method/headers/query body
    let url = prestoinst.host
    let host = url + ':' + prestoinst.port
    let request = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Presto-User': prestoinst.user,
            'X-Presto-Catalog': prestoinst.catalog,
            'X-Presto-Schema': prestoinst.schema
        },
        body: query
    }
    console.log('""""""""""""""""""""""""""""""""')
    console.log('')
    console.log('Beginning run of "javascript-presto-client", version 0.1')
    console.log('')
    console.log('Your endpoint is: ' + host + endpoint + ' and your query is: ' + request.body)
    console.log('')
    console.log('Making server call...')
    console.log('')

    try {
        //  make initial call to server, with POST method and the query to be evaluated
        let response = await Response(host + endpoint, request, data)
        console.log('')
        console.log('...Query Executed! Returning response now.')
        console.log('')
        console.log('""""""""""""""""""""""""""""""""')

        if(response.hasOwnProperty('message')) {
            reserr = {
                message: response.message
            }
            return reserr
        }
        else {
            let jsonres = {
                columns: response.columns[0],
                data: response.data
            }
            console.log(jsonres.columns)
            console.log(jsonres.data)
            return jsonres
        }

    } catch (err) {
        console.log(err)
        return err
    }
}

/*
 *  handle the response from the server
 *  each request needs to be turned from a string into a json object
 *  if the return object contains the field 'nextUri', then go to that route + the host
 *  return data in fields columns and data
*/
const Response = async (url, request, data) => {
    let res = await Request(url, request)

    //  check for errors
    if(res.hasOwnProperty('error')) {
        console.log(res.error)
        return res.error
    }

    //  add to the data and columns fields for the
    //  return data that will be handled on the front end
    //  set up this way to handle returning duplicate columns
    if(res.hasOwnProperty('columns') && res.hasOwnProperty('data')) {
        console.log('...I see columns and data...working on it...')
        data.columns.push(res.columns)
        data.data.push(res.data)
    }
    else if(res.hasOwnProperty('data')) {
        console.log('...I see just data...working on it...')
        data.data.push(res.data)
    }

    if(res.hasOwnProperty('nextUri')) {
        console.log('...going to next URI at: ' + res.nextUri + "...")
        return Response(res.nextUri, cont, data)
    }
    return data
}

/*
 *  make a request to the Cluster
 *  url -> current route for query
 *  request -> current request (either POST or GET)
*/
const Request = async (url, request) => {
    try {
        const response = await fetch(url, request)
        return await response.json()
    } catch (err) {
        return err
    }
}

module.exports.PrestoClient = PrestoClient