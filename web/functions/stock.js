export function onRequest(context) {
  try {
    return fetch('https://api.vc89.online/stock')
  } catch(error) {
    console.error('fetch error', error)
    const errorInfo = `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
    return Response.json({ message: errorInfo });
  
  }
}