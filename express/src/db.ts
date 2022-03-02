import { createConnection, getConnection } from 'typeorm'

const connectionName = process.env.NODE_ENV || 'development'

const connection = {
  async create(): Promise<void> {
    await createConnection(connectionName)
    console.log(`Connecting to MySQL(${connectionName}) successfully!`)
  },

  async close(): Promise<void> {
    await getConnection(connectionName).close()
    console.log(`Connection to MySQL(${connectionName}) has been properly closed!`)
  }
}

export default connection
