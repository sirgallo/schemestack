const fetch = require('node-fetch')


const fetchSchema = async (prestoinst, query) => {
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

    console.log('Attempting to get Schema...hold tight')
    console.log(request)
    try {
        let response = await Request(request)
        console.log('Returned a Schema...phew')
        return response
    }
    catch (err) {
        throw err
    }
}

const Request = async (request) => {
    try {
        const response = await fetch('http://prestoapi:8086/info', request)
        return await response.json()
    }
    catch (err) {
        throw err
    }
}

module.exports.fetchSchema = fetchSchema