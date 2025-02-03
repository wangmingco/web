export default async function queryKLindData(env, table) {
  try {
    const startDateStr = startDate()
    const sql = `SELECT openPrice,closePrice,highPrice,lowPrice,tradeCount,tradeDate,changeMargin FROM ${table} where tradeDate >= '${startDateStr}' order by id limit 10000`
    const results = await env.DB.prepare(sql).all()
    const dataList = results.results
    dataList.forEach(item => {
      if (item.changeMargin > 0) {
        item.changeMargin = 1;
      } else if (item.changeMargin < 0) {
        item.changeMargin = -1;
      }
      // 如果 changeMargin 等于 0，保持不变
    });
    // 定义字段顺序
    const fieldOrder = ["tradeDate", "openPrice", "highPrice", "lowPrice", "closePrice", "tradeCount", "changeMargin"];

    // 提取每个子对象的值并构建成数组
    const result = Object.values(dataList).map(item => {
      return fieldOrder.map(field => {
        // 如果字段不存在，返回 0
        return item[field] !== undefined ? item[field] : 0;
      });
    });
    
    return {
      status: 0,
      data: result
    };
  } catch(error) {
    const errorInfo = `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
    return {status: 1, data: errorInfo};
  }
}

function startDate() {
  const now = new Date((new Date()).getTime() + (8 * 60 * 60 * 1000));
  now.setDate(now.getDate() - 1800);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${date}`;
  return formattedDateTime
}