import { Router } from 'express'
import passport from 'passport'

const routerGH = Router()

routerGH.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }))

export default routerGH