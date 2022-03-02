import { Router } from 'express'
import todoRoute from './todo'

const router = Router()

router.use('/todos', todoRoute)

export default router
