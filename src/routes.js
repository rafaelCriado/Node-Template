import { Router } from 'express'
import PageController from './app/controllers/PageController'

const routes = new Router()


routes.get('/teste', PageController.index)


export default routes
