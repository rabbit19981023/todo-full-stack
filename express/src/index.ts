import Server from './server'
import connection from './db'

const main = (async () => {
  const server = new Server()
  const PORT = process.env.PORT || 3000
  await connection.create()
  server.listen(PORT, () => console.log(`The server is running at ${PORT}...`))
})()
