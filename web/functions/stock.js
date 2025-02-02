export function onRequest(context) {
  try {
    var result = fetch('https://api.vc89.online/stock')
    return Response.json({ data: result });
  } catch(error) {
    var errorInfo = `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
    return Response.json({ message: errorInfo });
  
  }
}