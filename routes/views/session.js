import { Router } from 'express'
import passport from 'passport'

const router = Router()

const auth = (req, res, next) => {
  if (req.session.user) {
    return next()
  }
  res.redirect('/login')
}

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/reset-password', (req, res) => {
  res.render('reset-password')
})

router.get('/profile', auth, (req, res) => {
  res.render('profile', req.session.user)
})

//mostraría la session activa
router.get('/current', auth, (req, res) => {
  res.render('profile', req.session.user)
})
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }))

export default router