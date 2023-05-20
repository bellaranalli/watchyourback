import { Router } from "express";

import routerVistaCartID from "./cartsDB.js";
import routerVistaMensaje from "./messagesDB.js";
import routerVistaProducto from "./productsDB.js";

const router = Router()

router.use('/carrito', routerVistaCartID) //http://localhost:8080/carrito/:id
router.use('/chat', routerVistaMensaje) //http://localhost:8080/chat
router.use('/productos', routerVistaProducto) //http://localhost:8080/productos

export default router