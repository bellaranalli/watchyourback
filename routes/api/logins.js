import { Router } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../../dao/models/userModel.js';
import cartModel from '../../dao/models/cartModel.js';
import Utils from '../../utils/index.js';
import bcrypt from 'bcrypt';

const routerLog = Router();

//Login
routerLog.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user || !validatePassword(password, user)) {
      return res.status(401).json({ error: 'Email o contraseña inválidos' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Actualizar el campo "status" del usuario a "active"
    user.status = 'active';
    await user.save();

    // Si el usuario es adminCoder@coder.com
    if (user.email === 'adminCoder@coder.com') {
      user.role = 'admin';
      await user.save();
    }

    res.json({ token });
    res.redirect('/profile'); 
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

//Registro
routerLog.post('/register', async (req, res) => {
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
      status: 'inactive', // Nuevo campo agregado al modelo
    });

    newCart.user = newUser._id;
    await newCart.save();

    res.json({ message: 'Usuario registrado exitosamente' });
    res.redirect('/login'); // Mover la redirección aquí
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar al usuario' });
  }
});

//Logout
routerLog.get('/logout', async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });

  // Actualizar el campo "status" del usuario a "inactive"
  user.status = 'inactive';
  await user.save();
  res.redirect('/login');
  res.json({ message: 'Sesión cerrada exitosamente' });
});

//Current
routerLog.get('/current', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No se proporcionó un token válido' });
  }
  const token = authorization.substring(7); // Eliminar "Bearer " del token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Reset Password
routerLog.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar la contraseña del usuario
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
});

export default routerLog;