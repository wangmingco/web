export async function onRequest(context) {
  try{
    const startDateStr = startDate()
    const sql = `SELECT date as tradeDate,m3,m6,y1,y2,y3,y5,y7,y10,y30 FROM Bond where date >= '${startDateStr}' order by id limit 10000`
    const result = await context.env.DB.prepare(sql).all()

     // 初始化 dateArray 和 dataArray
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
      y5Array.push([6, i, row.y5])
      y7Array.push([7, i, row.y7])
      y10Array.push([8, i, row.y10])
      y30Array.push([9, i, row.y30])
    }

    const combinedArray = m3Array.concat(m6Array, y1Array, y2Array, y3Array, y5Array, y7Array, y10Array, y30Array);
    // const dataArray = combinedArray.map(function (item) {
    //   return [item[1], item[0], item[2] || '-'];
    // });

    return Response.json({
      dateArray: dateArray,
      dataArray: combinedArray
    });

  } catch(error) {
    const errorInfo = `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
    return Response.json({message: errorInfo});
  }
}

function startDate() {
  const now = new Date((new Date()).getTime() + (8 * 60 * 60 * 1000));
  now.setDate(now.getDate() - 365);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${date}`;
  return formattedDateTime
}