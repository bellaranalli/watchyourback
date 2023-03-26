import { Router } from 'express'

import MessageManagerDB from '../../dao/dbManager/messageManagerDB.js'

const routerMessages = Router()

//EN LAS RUTAS SIEMPRE /MONGOP/...

routerMessages
  //la ruta para mostrar mensajes de la db seria localhost:8080/mongom/get
  .get('/get', MessageManagerDB.get)
  //la ruta para postear mensjaes en la db seria localhost:8080/mongom/post
  .post('/post', MessageManagerDB.create)
   //la ruta para mostrar mensajes por id de la db seria localhost:8080/mongom/get/id
  .get('/get/messages/:id', MessageManagerDB.getById)
  //la ruta para modificar mensajes por id de la db seria localhost:8080/mongom/put/id
  .put('/put/messages/:id', MessageManagerDB.updateById)
  //la ruta para eliminar mensajes por id de la db seria localhost:8080/mongom/delete/id
  .delete('/delete/messages/:id', MessageManagerDB.deleteById)

export default routerMessages