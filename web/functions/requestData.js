import queryKLindData from "./kline";
export async function onRequest(context) {

    try {
        const req = await context.request.json();
        const name = req.type;
        const year = req.year;

        if (year !== 1 || year !== 5 || year !== 10) {
            return Response.json({ error: context.functionPath });
        }

        const tableName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        const data = await env.FinanceCache.get(tableName + '-' + year)
        if (data === null || data === undefined) {
            return await queryFromDB(context, tableName, year)
        }
        return Response.json(data);
    } catch (error) {
        return Response.json(context);
    }
}

async function queryFromDB(env, tableName, year) {
    switch (tableName) {
        case 'Bitcoin':
        case 'Forex':
        case 'Gold':
        case 'Stock':
            {
                const result = await queryKLindData(env, tableName, year)
                return Response.json(result.data);
            }
        case 'Bond':
            {
                const result = await queryBondData(env, tableName, year)
                return Response.json(result.data);
            }
    }
}

async function queryBondData(env, tableName, year) {
    try {
        const startDateStr = startDate(year)
        const sql = `SELECT date as tradeDate,m3,m6,y1,y2,y3,y5,y7,y10,y30 FROM ${tableName} where date >= '${startDateStr}' order by id limit 10000`
        const result = await env.DB.prepare(sql).all()
        return convertToLineStack(result)
    } catch (error) {
        const errorInfo = `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
        return Response.json({ message: errorInfo });
    }
}

function convertToLineStack(result) {
    const dateArray = [];
    const m3Array = [];
    const m6Array = [];
    const y1Array = [];
    const y2Array = [];
    const y3Array = [];
    const y5Array = [];
    const y7Array = [];
    const y10Array = [];
    const y30Array = [];

    // 遍历每一行数据
    const results = result.results
    for (let i = 0; i < results.length; i++) {
        const row = results[i]
        if (!dateArray.includes(row.tradeDate)) {
            dateArray.push(row.tradeDate); // 将 tradeDate 添加到 dateArray
        }

        m3Array.push(row.m3)
        m6Array.push(row.m6)
        y1Array.push(row.y1)
        y2Array.push(row.y2)
        y3Array.push(row.y3)
        y5Array.push(row.y5)
        y7Array.push(row.y7)
        y10Array.push(row.y10)
        y30Array.push(row.y30)
    }

    const dataArray = []
    dataArray.push({
        name: 'm3',
        type: 'line',
        stack: 'Total',
        data: m3Array
    })
    dataArray.push({
        name: 'm6',
        type: 'line',
        stack: 'Total',
        data: m6Array
    })
    dataArray.push({
        name: 'y1',
        type: 'line',
        stack: 'Total',
        data: y1Array
    })
    dataArray.push({
        name: 'y2',
        type: 'line',
        stack: 'Total',
        data: y2Array
    })
    dataArray.push({
        name: 'y3',
        type: 'line',
        stack: 'Total',
        data: y3Array
    })
    dataArray.push({
        name: 'y5',
        type: 'line',
        stack: 'Total',
        data: y5Array
    })
    dataArray.push({
        name: 'y7',
        type: 'line',
        stack: 'Total',
        data: y7Array
    })
    dataArray.push({
        name: 'y10',
        type: 'line',
        stack: 'Total',
        data: y10Array
    })
    dataArray.push({
        name: 'y30',
        type: 'line',
        stack: 'Total',
        data: y30Array
    })
    return Response.json({
        dateArray: dateArray,
        dataArray: dataArray
    });
}

function convertToHeatmap(result) {
    const dateArray = [];

    const m3Array = [];
    const m6Array = [];
    const y1Array = [];
    const y2Array = [];
    const y3Array = [];
    const y5Array = [];
    const y7Array = [];
    const y10Array = [];
    const y30Array = [];

    // 遍历每一行数据
    const results = result.results
    for (let i = 0; i < results.length; i++) {
        const row = results[i]
        if (!dateArray.includes(row.tradeDate)) {
            dateArray.push(row.tradeDate); // 将 tradeDate 添加到 dateArray
        }
        m3Array.push([0, i, row.m3])
        m6Array.push([1, i, row.m6])
        y1Array.push([2, i, row.y1])
        y2Array.push([3, i, row.y2])
        y3Array.push([4, i, row.y3])
        y5Array.push([5, i, row.y5])
        y7Array.push([6, i, row.y7])
        y10Array.push([7, i, row.y10])
        y30Array.push([8, i, row.y30])
    }

    const combinedArray = m3Array.concat(m6Array, y1Array, y2Array, y3Array, y5Array, y7Array, y10Array, y30Array);
    const dataArray = combinedArray.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });

    return Response.json({
        dateArray: dateArray,
        dataArray: dataArray
    });
}
function startDate(years) {
    const now = new Date((new Date()).getTime() + (8 * 60 * 60 * 1000));
    now.setDate(now.getDate() - 365 * years);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${date}`;
    return formattedDateTime
}