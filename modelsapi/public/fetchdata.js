const fetch = require('node-fetch')

const fetchData = async(prestoinst, query) => {
    let params = {
        'presto': prestoinst,
        'query': query
    }

    let request = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }

    console.log('Preparing to find your data...')
    console.log(request)
    try {
        let response = await Request(request)
        console.log('Returned your data!')
        return response
    }
    catch (err) {
        throw err
    }
}

const Request = async (request) => {
    try {
        //  call the presto api using fetch with the request
        const response = await fetch('http://prestoapi:8086/query', request)
        return await response.json()
    }
    catch (err) {
        throw err
    }
}

module.exports.fetchData = fetchData