import { Router } from 'express'

import userModel from '../../dao/models/userModel.js'

const router = Router()

router.post('/login', async (req, res) => {

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
    return res.render('login', { error: 'Todo los campos debe venir en la solicitud.' })
  }

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.render('login', { error: 'Email o password invalido.' })
  }

  if (user.password !== password) {
    return res.render('login', { error: 'Email o password invalido.' })
  }

  req.session.user = user

  res.redirect('/profile')
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
    return res.render('register', { error: 'Todo los campos debe venir en la solicitud.' })
  }
  try {
    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password,
    })

    console.log('new user', user)
    
    res.redirect('/login')

  } catch (error) {
    res.render('register', { error: 'El correo ya existe en la db.' })
  }

})

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (!error) {
      res.redirect('/login')
    } else {
      res.send({status: 'Logout Error', body: error })
    }
  })
})

export default router