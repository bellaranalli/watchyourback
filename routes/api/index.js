import { Router } from "express";

import routerCarts from "./cartsDB.js";
import routerMessages from "./messagesDB.js";
import routerProducts from "./productsDB.js";
import routerUsers from "./usersDB.js";
import authRouter from "./auth.js";
import routerGH from "./gitHub.js";
import routerLog from "./logins.js";
import purchaseRouter from "./purchase.js";

import Utils from "../../utils/index.js";


const router = Router()

router.use('/mongoc', routerCarts)
router.use('/mongom', routerMessages)
router.use('/mongop', routerProducts)
router.use('/mongou', routerUsers)
router.use('/', authRouter) //localhost:8080/login
router.use('/current', Utils.authJWTMiddleware('admin'), Utils.authorizationMiddleware('admin'), (req, res) => {
    res.json({ success: true, message: 'This is a private route', user: req.user })
})
router.use('/', routerGH)
router.use('/login', routerLog)
router.use('/', purchaseRouter) 

export default router