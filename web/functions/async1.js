// export function onRequest(context) {
//   try {
//     var result = fetch('https://api.vc89.online/stock')
//     return Response.json({ data: result });
//   } catch(error) {
//     var errorInfo = `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
//     return Response.json({ message: errorInfo });
  
//   }
// }

// addEventListener('fetch', event => {
//   event.respondWith(handleRequest(event.request));
// });

// async function handleRequest(request) {
//   return new Response('Send a POST request to trigger a notification.');
// }

// export function onRequest(context) {
//   try {
//     return fetch('https://api.vc89.online/stock')
//   } catch(error) {
//     return `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
//   }
// }

export async function onRequest(context) {
  try {
    return 'ok'
  } catch(error) {
    return `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
  }
}