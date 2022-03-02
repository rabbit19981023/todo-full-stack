import request from 'supertest'

const createTodo = (app: Express.Application) => {
  return request(app)
    .post('/api/v1/todos')
    .send({
      name: 'read a book'
    })
}

export default createTodo
