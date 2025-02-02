export function onRequest(context) {
  const results = context.env.DB.prepare("SELECT * FROM Bitcoin order by id desc limit 10").all()
			return Response.json(results);
}