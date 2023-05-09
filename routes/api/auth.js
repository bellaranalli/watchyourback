import {Router} from 'express' 
import UserManagerDB from '../../dao/dbManager/userManagerDB.js'

const authRouter = Router()

authRouter
.post('/login', UserManagerDB.login)
.post('/register', UserManagerDB.create)

export default authRouter
