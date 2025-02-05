import queryKLindData from "./kline";
export async function onRequest(context) {
  const result = await queryKLindData(context.env, 'Bitcoin', 5)
  return Response.json(result.data);
}