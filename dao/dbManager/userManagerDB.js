import userModel from '../models/userModel.js'
import cartModel from '../models/cartModel.js';
import Utils from '../../utils/index.js'
import Carts from "../cartsDao.js";
import Users from '../usersDao.js';
import { uploader } from '../../utils.js'
import { storage } from '../../utils.js';
import multer from 'multer';


class UserManagerDB {

  static async create(req, res) {
    const { body } = req;
    const cart = await Carts.createCart({ items: [] }); // creo carrito vacío con el registro de usuario
    const user = {
      ...body,
      password: Utils.createHash(body.password),
      cart: cart._id, 
      status: 'inactive',
      last_connection: new Date(), // Agregar la propiedad "last_connection" con la fecha y hora actual
    };
    const result = await Users.createUser(user);
    res.status(201).json(result);
  }
  

  static async get(req, res) {
    const result = await Users.getUsers()
    res.status(200).json(result)
  }

  static async getById(req, res) {
    const { params: { id } } = req
    const result = await Users.getUserById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }

  static async updateById(req, res) {
    const id = req.params.id
    const data = req.body
    await Users.updateUserById(id, data)
    res.status(200).json({message: 'Updated'})
  }

  static async deleteById(req, res) {
    const { params: { id } } = req
    await Users.deleteUser({ _id: id })
    res.status(204).end()
  }

  static async login(req, res){
    const {body: {email, password}} = req
    const user = await Users.getUserLog({email})

    if(!user){
      return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto'})
    }

    if(!Utils.validatePassword(password, user)){
      return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto'})
    }
    // si logueo el usuario pasa a estar activo
    user.status = 'active';
    user.last_connection = new Date(); // Actualizar la propiedad "last_connection" con la fecha y hora actual
    await user.save();

    // Si el usuario es adminCoder@coder.com se guardia al loguear como "admin"
    if (user.email === 'adminCoder@coder.com') {
      user.role = 'admin';
      await user.save();
    }

  
    const token = Utils.tokenGenerator(user)
    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
    }).status(200).json({success: true, access_token: token})
  } 

  static async logout(req, res) {
    const {body: {email}} = req
    const user = await Users.getUserLog({email})
    user.status = 'inactive'; // si deslogueo el usuario pasa a estar inactivo
    user.last_connection = new Date(); // Actualizar la propiedad "last_connection" con la fecha y hora actual
    await user.save();
    res.clearCookie('token');
    res.status(200).json({success: true});
  }

  static async changeUserRole(req, res) {
    const { params: { id } } = req;
    const user = await Users.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    let newRole = '';
    if (user.role === 'user') {
      newRole = 'premium';
    } else if (user.role === 'premium') {
      newRole = 'user';
    } else {
      return res.status(400).json({ message: 'Rol de usuario inválido' });
    }

    user.role = newRole;
    await user.save();

    res.status(200).json({ message: 'Rol de usuario actualizado exitosamente', newRole });
  }

  static async uploadImage(req, res) {
    try {
      const { params: { id } } = req;

      // Verificar si el usuario existe
      const user = await Users.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Configuración de multer para guardar en diferentes carpetas
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
          let folder;
          if (file.fieldname === 'profileImage') {
            folder = 'profiles';
          } else if (file.fieldname === 'productImage') {
            folder = 'products';
          } else if (file.fieldname === 'document') {
            folder = 'documents';
          } else {
            return cb(new Error('Tipo de archivo no válido'));
          }

          const uploadPath = `public/imgs/${folder}`;
          cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        }
      }).single('file');

      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'Error al subir el archivo' });
        }

        // Actualizar el status del usuario para indicar que se ha subido un documento
        user.status = 'documentUploaded';
        await user.save();

        res.status(200).json({ message: 'Documento subido exitosamente' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default UserManagerDB;