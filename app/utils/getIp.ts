export async function getIp(context: { req: any }) {
  let ip

  const { req } = context

  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0]
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress
  } else {
    ip = req.connection.remoteAddress
  }

  console.log(ip)
  return {
    ip,
  }
}
