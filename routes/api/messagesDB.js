import { Router } from 'express'

import MenssageManagerDB from '../../dao/dbManager/messageManagerDB.js'

const routerMessages = Router()

//EN LAS RUTAS SIEMPRE /MONGOP/...
//la ruta para postear en la db seria localhost:8080/mongop/post

routerMessages
  //la ruta para mostrar mensajes de la db seria localhost:8080/mongom/get
  .get('/get', MenssageManagerDB.get)
  //la ruta para postear mensjaes en la db seria localhost:8080/mongom/post
  .post('/post', MenssageManagerDB.create)
   //la ruta para mostrar mensajes por id de la db seria localhost:8080/mongom/get/id
  .get('/get/messages/:id', MenssageManagerDB.getById)
  //la ruta para modificar mensajes por id de la db seria localhost:8080/mongom/put/id
  .put('/put/messages/:id', MenssageManagerDB.updateById)
  //la ruta para eliminar mensajes por id de la db seria localhost:8080/mongom/delete/id
  .delete('/delete/messages/:id', MenssageManagerDB.deleteById)

export default routerMessages