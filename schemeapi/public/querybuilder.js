const queryBuilder = (req) => {
    let query = 'select "'
    let cols = req.body.columns
    let tab = req.body.table
    let wheres = req.body.wheres
    let joins = req.body.joins
    let group = req.body.group
    let order = req.body.order
    let limit = req.body.limit

    // build our query
    if(joins.slctjoins != [] && joins.joins != '' && joins.tbl != '' && joins.clmorig.name != '' && joins.clmjoins.name != ''){
        for(let i = 0; i < cols.length; i++) {
            query += cols[i].name + '", "'
        }
        for(let i = 0; i < joins.slctjoins.length; i++) {
            if (i == joins.slctjoins.length - 1)
              query += joins.slctjoins[i].name + '" from "'
            else {
                query += joins.slctjoins[i].name + '", "'
            }
        }
        query += tab + '"'
        query += ' ' + joins.joins + ' "' +
            joins.tbl + '" on "' +
            tab + '"."' + joins.clmorig.name + '" = "' +
            joins.tbl + '"."' + joins.clmjoins.name + '"'
    }
    else {
        for(let i = 0; i < cols.length; i++) {
            if (i == cols.length - 1)
              query += cols[i].name + '" from "'
            else {
                query += cols[i].name + '", "'
            }
        }
        query += tab + '"'
    }
    if(wheres.length > 0) {
        query += ' where '
        if(wheres.length == 1) {
            query += '"' + wheres[0].clm + '" '
            query += wheres[0].compare + ' '
            query += wheres[0].val + ' '
        }
        else {
            query += '("'
            for(let i = 0; i < wheres.length; i++) {
                if(i == wheres.length - 1) {
                    query += wheres[i].clm + '" ' +
                        wheres[i].compare + ' ' +
                        wheres[i].val + ') '
                }
                else {
                    query += wheres[i].clm + '" '
                    query += wheres[i].compare + ' '
                    query += wheres[i].val + ' and "'
                }
            }
        }
    }
    if(group != '') {
        query += ' group by "' +
            group.name + '"'
    }
    if(order.order != '' && order.clmtbl1.length > 0){
        query += ' order by "'
        if(order.clmtbl2.length > 0){
            for(let i = 0; i < order.clmtbl2.length; i++) {
                query += order.clmtbl2[i].name + '", "'
            }
        }
        for(let i = 0; i < order.clmtbl1.length; i++) {
            if(i == order.clmtbl1.length - 1) {
                query += order.clmtbl1[i].name + '"'
            }
            else {
                query += order.clmtbl1[i].name + '",  "'
            }
        }
        query += ' ' + order.order
    }

    query += ' limit ' + limit

    return query
}

module.exports.queryBuilder = queryBuilder