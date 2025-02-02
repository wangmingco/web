export function onRequest(context) {
  return Response.json({ message: context });
}