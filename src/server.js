/* eslint-disable no-console */
import Express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import errorHandler from 'errorhandler'
import morgan from 'morgan'
import notifier from 'node-notifier'

import '@babel/polyfill'

import { env, corsOptions } from './config'
import routes from './routes'


class Server {
    run() {
        this.app = Express()
        this.app.set('PORT', env.PORT)

        this.middlewares()
        this.routes()

        this.app.listen(this.app.get('PORT'), () => {
            console.log(`App is listening on port: ${chalk.cyanBright(this.app.get('PORT'))}`)
            console.log(`Environment: ${chalk.green(env.NODE_ENV)}`)
        })
    }

    middlewares() {
        this.app.use(cors(corsOptions))
        this.app.use(Express.json())

        if (env.NODE_ENV === 'development') {
            this.app.use(errorHandler({ log: this.errorNotification }))
            this.app.use(morgan('combined'))
        }
    }

    routes() {
        this.app.use(routes)
    }


    errorNotification(err, str, req) {
        const title = `Error in ${req.method} - ${req.url}`

        notifier.notify({
            title,
            message: str,
        })
    }
}

export default Server
