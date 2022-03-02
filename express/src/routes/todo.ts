import { Router } from 'express'
import { todoController } from '../controller'

const router = Router()

// Allow our frontend (Vue) can access these APIs
router.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  next()
})

router.get('/', todoController.getAll)
router.get('/:id', todoController.getOne)
router.post('/', todoController.addOne)
router.patch('/:id', todoController.updateOne)
router.delete('/:id', todoController.deleteOne)

export default router
