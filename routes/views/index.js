import { Router } from "express";

import Utils from "../../utils/index.js";

import routerVistaCartID from "./cartsDB.js";
import routerVistaMensaje from "./messagesDB.js";
import routerVistaProducto from "./productsDB.js";
import routerGH from "./githubDB.js";
import routerLogV from "./logins.js";
import routerViewUsers from "./indexUsers.js";

const router = Router()

router.use('/carrito', routerVistaCartID) //http://localhost:8080/carrito/:id
router.use('/chat', routerVistaMensaje) //http://localhost:8080/chat
router.use('/productos', routerVistaProducto) //http://localhost:8080/productos/total
router.use('/', routerGH)
router.use('/', routerLogV)
router.use('/users', Utils.authJWTMiddleware(['admin']), routerViewUsers) //http://localhost:8080/users/management

export default router