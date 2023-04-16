import { Router } from 'express'

import passport from 'passport'
import userModel from '../../dao/models/userModel.js'
import { createHash, validatePassword } from '../../utils/index.js'


const router = Router()

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
  console.log('req.user', req.user);
  req.session.user = req.user
  const user = await userModel.findOne({ email: req.user.email });

  //Si el usuario es adminCoder@coder.com // adminCod3r123 pass 
  if (user.email === 'adminCoder@coder.com') {
    user.role = 'admin';
    await user.save();
  }
  res.redirect('/profile')
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => {
  res.redirect('/login')
})

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (!error) {
      res.redirect('/login')
    } else {
      res.send({ status: 'Logout Error', body: error })
    }
  })
})

router.post('/reset-password', async (req, res) => {

  const {
    body: {
      email,
      password,
    }
  } = req

  if (
    !email ||
    !password
  ) {
    return res.render('reset-password', { error: 'Todo los campos debe venir en la solicitud.' })
  }

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.render('reset-password', { error: 'Email no existe.' })
  }

  user.password = createHash(password)

  await userModel.updateOne({ email }, user)

  res.redirect('/login')
})

export default router


//CODIGO NO UTILIZADO 
/*router.post('/login', async (req, res) => {

  const {
    body: {
      email,
      password,
    }
  } = req

  if (
    !email ||
    !password
  ) {
    return res.render('login', { error: 'Completar los campos solicitados' })
  }

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.render('login', { error: 'Email o password no válido' })
  }

  if (!validatePassword(password, user)) {
    return res.render('login', { error: 'Email o password no válido' })
  }

  req.session.user = user
  //adminCod3r123 pass del admin
  if (user.email === 'adminCoder@coder.com') {
    user.role = 'admin'
    await user.save()
  }

  res.redirect('/productos')
})

router.post('/register', async (req, res) => {
  const {
    body: {
      first_name,
      last_name,
      email,
      age,
      password,
    }
  } = req

  if (
    !first_name ||
    !last_name ||
    !email ||
    !age ||
    !password
  ) {
    return res.render('register', { error: 'Completar los campos solicitados' })
  }
  try {
    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    })

    console.log('new user', user)

    res.redirect('/login')

  } catch (error) {
    res.render('register', { error: 'El correo ya existe en la db.' })
  }

})*/
