export async function onRequest(context) {
  const results = await context.env.DB.prepare("SELECT * FROM Bitcoin order by id desc limit 10").all()
			return Response.json(results);
}