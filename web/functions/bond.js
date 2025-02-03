export async function onRequest(context) {
  try{
    const startDateStr = startDate()
    const sql = `SELECT date as tradeDate,m3,m6,y1,y2,y3,y5,y7,y10,y30 FROM Bond where date >= '${startDateStr}' order by id desc limit 10000`
    const result = await context.env.DB.prepare(sql).all()

     // 初始化 dateArray 和 dataArray
     const dateArray = [];
     const dataArray = [];

     // 遍历每一行数据
     result.results.forEach(row => {
       dateArray.push(row.tradeDate); // 将 tradeDate 添加到 dateArray
       // 将其他字段的值添加到 dataArray
       dataArray.push([
         row.m3,
         row.m6,
         row.y1,
         row.y2,
         row.y3,
         row.y5,
         row.y7,
         row.y10,
         row.y30
       ]);
     });

    return Response.json({
      dateArray: dateArray,
      dataArray: dataArray
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