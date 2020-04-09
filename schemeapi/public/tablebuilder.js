const tableBuilder = (data) => {
    let table = '<div class="card"><table class="table"><thead class="thead-dark"><tr>'
    for(let i = 0; i < data.columns.length; i++)
        table += '<th scope="col">' + data.columns[i].name + '</th>'
    table += '</tr></thead><tbody>'
    for(let i = 0; i < data.data.length; i++) {
        table += '<tr>'
        for(let j = 0; j <data.data[i].length; j++) {
            table += '<td>' + data.data[i][j] + '</td>'
        }
        table += '</tr>'
    }
    table += '</tbody></table></div>'

    return table
}

module.exports.tableBuilder = tableBuilder