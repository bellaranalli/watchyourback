import { Router } from 'express'

import passport from 'passport'
import userModel from '../../dao/models/userModel.js'
import cartModel from '../../dao/models/cartModel.js'
import Utils from '../../utils/index.js'


const router = Router()

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
  console.log('req.user', req.user);
  req.session.user = req.user;

  const user = await userModel.findOne({ email: req.user.email });

  // actualizar el campo "status" del usuario a "active"
  user.status = 'active';
  await user.save();

  // Si el usuario es adminCoder@coder.com
  if (user.email === 'adminCoder@coder.com') {
    user.role = 'admin';
    await user.save();
  }

  res.redirect('/profile');
});

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const newCart = await cartModel.create({});
    const cartId = newCart._id;

    const newUser = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: cartId,
      status: 'inactive', // nuevo campo agregado al modelo
    });

    newCart.user = newUser._id;
    await newCart.save();

    res.redirect('/login');
  } catch (error) {
    res.render('register', { error: 'Error al registrar al usuario.' });
  }
});

router.get('/logout', async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });

  // actualizar el campo "status" del usuario a "inactive" antes de destruir la sesión
  user.status = 'inactive';
  await user.save();

  req.session.destroy((error) => {
    if (!error) {
      res.redirect('/login');
    } else {
      res.send({ status: 'Logout Error', body: error });
    }
  });
});

router.post('/reset-password', async (req, res) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) {
    return res.render('reset-password', { error: 'Todo los campos debe venir en la solicitud.' });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.render('reset-password', { error: 'Email no existe.' });
  }

  user.password = createHash(password);

  await userModel.updateOne({ email }, user);

  res.redirect('/login');
});

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/profile');
});

//http://localhost:8080/api/sessions/current
router.get('/current', (req, res) => {
  const { user } = req.session;
  res.json(user);
});

export default router;

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
