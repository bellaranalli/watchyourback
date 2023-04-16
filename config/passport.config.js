import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import userModel from '../dao/models/userModel.js'
import { createHash, validatePassword } from '../utils/index.js'

const initPassport = () => {
  const options = {
    usernameField: 'email',
    passReqToCallback: true,
  }
  passport.use('register', new LocalStrategy(options, async (req, email, password, done) => {
    const {
      body: {
        first_name,
        last_name,
        age,
      }
    } = req
  
    if (
      !first_name ||
      !last_name || 
      !age
    ) {
      return done(new Error('Todo los campos debe venir en la solicitud.'))
    }

    try {
      let user = await userModel.findOne({ email })

      if (user) {
        console.log('User already register.')
        return done(null, false)
      }

      user = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
      })
      
      done(null, user)
  
    } catch (error) {
      return done(new Error('Error al obtener el usuario:', error.message))
    }
  }))

 passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
  try {
    const user = await userModel.findOne({ email })

    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' })
    }

    if (!validatePassword(password, user)) {
      return done(null, false, { message: 'Contraseña incorrecta' })
    }

    done(null, user)
  } catch (error) {
    return done(error, false, { message: 'Error al obtener el usuario' })
  }
}))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser( async (id, done) => {
    let user = await userModel.findById(id)
    done(null, user)
  })
}

export default initPassport