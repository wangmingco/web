import queryKLindData from "./kline";
export async function onRequest(context) {
  const result = await queryKLindData(context.env, 'Gold')
  return Response.json(result.data);
}