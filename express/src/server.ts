import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import routes from './routes'

class Server {
  private readonly app: express.Application

  constructor() {
    this.app = express()

    this.readEnv()
      .registerMiddlewares()
      .registerRouters()
  }

  public listen(port: string | number, callback: () => void) {
    this.app.listen(port, callback)
  }

  public getApp(): express.Application {
    return this.app
  }

  private readEnv(): this {
    dotenv.config()
    return this
  }

  private registerMiddlewares(): this {
    this.app.use(morgan('tiny'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    return this
  }

  private registerRouters(): this {
    this.app.use(routes)
    return this
  }
}

export default Server
