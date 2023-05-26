import userModel from '../models/userModel.js'
import cartModel from '../models/cartModel.js';
import Utils from '../../utils/index.js'

class UserManagerDB {

  static async create(req, res) {
    const { body } = req;
    const cart = await cartModel.create({ items: [] }); // creo carrito vacío con el registro de usuario
    const user = {
      ...body,
      password: Utils.createHash(body.password),
      cart: cart._id, 
      status: 'inactive',
    };
    const result = await userModel.create(user);
    res.status(201).json(result);
  }
  

  static async get(req, res) {
    const result = await userModel.find()
    res.status(200).json(result)
  }

  static async getById(req, res) {
    const { params: { id } } = req
    const result = await userModel.findById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }

  static async updateById(req, res) {
    const { params: { id }, body } = req
    await userModel.updateOne({ _id: id }, { $set: body })
    res.status(204).end()
  }

  static async deleteById(req, res) {
    const { params: { id } } = req
    await userModel.deleteOne({ _id: id })
    res.status(204).end()
  }

  static async login(req, res){
    const {body: {email, password}} = req
    const user = await userModel.findOne({email})

    if(!user){
      return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto'})
    }

    if(!Utils.validatePassword(password, user)){
      return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto'})
    }
    // si logueo el usuario pasa a estar activo
    user.status = 'active';
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
    const user = await userModel.findOne({email})
    user.status = 'inactive'; // si deslogueo el usuario pasa a estar inactivo
    await user.save();
    res.clearCookie('token');
    res.status(200).json({success: true});
}

}

export default UserManagerDB