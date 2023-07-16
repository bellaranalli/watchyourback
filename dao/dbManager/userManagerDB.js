import userModel from '../models/userModel.js'
import cartModel from '../models/cartModel.js';
import Utils from '../../utils/index.js'
import Carts from "../cartsDao.js";
import Users from '../usersDao.js';
import { uploader } from '../../utils.js'
//import { storage } from '../../utils.js';
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
  
    if (user.role === 'premium') {
      return res.status(200).json({ message: 'El usuario ya cuenta con rol premium' });
    }
  
    if (
      !user.documents.identification ||
      !user.documents.proofOfAddress ||
      !user.documents.accountStatement
    ) {
      return res.status(400).json({ message: 'El usuario no ha terminado de procesar su documentación' });
    }
  
    user.role = 'premium';
    await user.save();
  
    res.status(200).json({ message: 'Rol de usuario actualizado exitosamente', newRole: 'premium' });
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
      const upload = multer({ storage: uploader.storage }).fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'productImage', maxCount: 1 },
        { name: 'document', maxCount: 1 }
      ]);

      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'Error al subir el archivo' });
        }

        // Obtener los archivos subidos
        const profileImage = req.files['profileImage'] ? req.files['profileImage'][0] : null;
        const productImage = req.files['productImage'] ? req.files['productImage'][0] : null;
        const document = req.files['document'] ? req.files['document'][0] : null;


        //FUNCIONA PERO OMITO EL STATUS PORQUE LO UTILIZO PARA VER SI EL USUARIO ESTA ACTIVO O INACTIVO
        /* Verificar qué tipo de archivo se subió y actualizar el status del usuario
        if (profileImage) {
          user.status = 'profileImageUploaded';
           Aquí puedes realizar alguna acción específica para el perfil de imagen
        } else if (productImage) {
          user.status = 'productImageUploaded';
           Aquí puedes realizar alguna acción específica para la imagen del producto
        } else if (document) {
          user.status = 'documentUploaded';
           Aquí puedes realizar alguna acción específica para el documento
        } else {
          Si no se subió ningún archivo válido
          return res.status(400).json({ message: 'No se subió ningún archivo válido' });
        }*/

        //await user.save();

        res.status(200).json({ message: 'Archivo subido exitosamente' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default UserManagerDB;