import userModel from '../models/userModel.js'
import cartModel from '../models/cartModel.js';
import Utils from '../../utils/index.js'
import Carts from "../cartsDao.js";
import Users from '../usersDao.js';
import { uploader } from '../../utils.js'

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
      const user = await Users.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Verificar si los documentos requeridos ya han sido cargados
      const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
      const hasAllDocuments = requiredDocuments.every(doc => user.documents.includes(doc));
      if (!hasAllDocuments) {
        return res.status(400).json({ message: 'Debe cargar todos los documentos requeridos' });
      }

      // Utilizar el middleware de multer para recibir los archivos
      const upload = uploader.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'productImage', maxCount: 5 },
        { name: 'document', maxCount: 5 }
      ]);

      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ message: 'Error al subir los archivos' });
        }

        // Obtener los archivos subidos
        const { profileImage, productImage, document } = req.files;

        // Actualizar el usuario para reflejar que se han cargado los documentos
        user.status = 'premium';

        // Guardar las rutas de los archivos en el usuario
        if (profileImage) {
          user.profileImage = profileImage[0].path;
        }

        if (productImage) {
          user.productImage = productImage[0].path;
        }

        if (document) {
          user.documents = document.map(doc => doc.path);
        }

        await user.save();

        res.status(200).json({ message: 'Documentos cargados exitosamente' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

}

export default UserManagerDB;