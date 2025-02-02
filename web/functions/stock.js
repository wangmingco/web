// export function onRequest(context) {
//   try {
//     var result = fetch('https://api.vc89.online/stock')
//     return Response.json({ data: result });
//   } catch(error) {
//     var errorInfo = `Error Message: ${error.message}\nStack Trace: ${error.stack}`;
//     return Response.json({ message: errorInfo });
  
//   }
// }

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'POST') {
    const { user } = await request.json();
    // 触发实时通知
    return new Response(`Notification sent to ${user}`, { status: 200 });
  }
  return new Response('Send a POST request to trigger a notification.');
}