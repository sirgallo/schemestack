const tableBuilder = async (data) => {
    return await new Promise (resolve => {
        //Build HTML for table 
        let table = '<div class="card" style="overflow-x:auto;"><table class="table"><thead class="thead-dark"><tr>'
        for(let i = 0; i < data.columns.length; i++)
            table += '<th scope="col">' + data.columns[i].name + '</th>'
        table += '</tr></thead><tbody>'
        for(let i = 0; i < data.data.length; i++) {
            for(let j = 0; j < data.data[i].length; j++) {
                table += '<tr>'
                for(let k = 0; k < data.data[i][j].length; k++)
                    table += '<td>' + data.data[i][j][k] + '</td>'
                table += '</tr>'
            }
        }
        table += '</tbody></table></div>'
        resolve(table)
    })
}

module.exports.tableBuilder = tableBuilder