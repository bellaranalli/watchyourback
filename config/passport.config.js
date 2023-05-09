import passport from 'passport'
//import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import dotenv from 'dotenv'
import userModel from '../dao/models/userModel.js'
import Utils from '../utils/index.js'

dotenv.config()

const githubOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK,
}

const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.token
  }
  return token
}

export const initPassport = () =>{
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET
  },(payload, done)=>{
    return done(null, payload)
  }
  ))
}
export default initPassport

passport.use(new GithubStrategy(githubOptions, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile)
    let user = await userModel.findOne({ email: profile._json.email })
    if (!user) {
      user = await userModel.create({
        first_name: profile._json.name,
        last_name: '',
        email: profile._json.email,
        age: '',
        password: '',
      })
    }
    console.log('user', user);
    done(null, user)
  } catch (error) {
    return done(new Error('Error al obtener el usuario:' + error.message))
  }
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id)
  done(null, user)
})



/*const initPassport = () => {
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

}

export default initPassport*/