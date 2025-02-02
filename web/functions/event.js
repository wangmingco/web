addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  return Response.json({event: event});
}