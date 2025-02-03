export async function onRequest(context) {
  try{
    const startDateStr = this.startDate()
    const sql = `SELECT date as tradeDate,m3,m6,y1,y2,y3,y5,y7,y10,y30 FROM Bond where date >= '${startDateStr}' order by id desc limit 10000`
    const result = await env.DB.prepare(sql).all()
    return Response.json(result.results);

  } catch(error) {
    const errorInfo = `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
    return Response.json({message: errorInfo});
  }
}
