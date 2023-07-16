import { Router } from "express";
import UserManagerDB from "../../dao/dbManager/userManagerDB.js";
import Utils from "../../utils/index.js";
import passport from 'passport'
const routerUsers = Router ()

routerUsers
.get('/',Utils.authJWTMiddleware(['admin']), UserManagerDB.get)
.post('/',Utils.authJWTMiddleware(['admin']),UserManagerDB.create)
.get('/:id',Utils.authJWTMiddleware(['admin', 'user']), UserManagerDB.getById)
.put('/:id',Utils.authJWTMiddleware(['admin','user']), UserManagerDB.updateById)
.delete('/:id',Utils.authJWTMiddleware(['admin','user']), UserManagerDB.deleteById)
.get('/premium/:id',Utils.authJWTMiddleware(['admin']), UserManagerDB.changeUserRole);
//.post('/:id/documents',Utils.authJWTMiddleware(['admin','user','premium']), UserManagerDB.????);
export default routerUsers