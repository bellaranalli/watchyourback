import messageModel from '../models/messageModel.js'
import Messages from '../messagesDao.js'
import { emit } from '../../socket.js'


class MessageManagerDB {
//CREO MENSAJES
static async create(req, res) {
  const { body } = req
  console.log(body)
  const mensaje = await Messages.createMessage(body)
  emit(mensaje)
  res.status(201).json(mensaje)
}
//BUSCO TODOS LOS MENSAJES
  static async get(req, res) {
    const result = await Messages.getMessages()
    res.status(200).json(result)
  }
//BUSCO MENSAJES POR ID
  static async getById(req, res) {
    const { params: { id } } = req
    const result = await Messages.getMessageById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }
//MODIFICO MENSAJES POR ID
  static async updateById(req, res) {
    //const { params: { id }, body } = req
    const id = req.params.id
    const data = req.body
    await Messages.updateMById(id, data)
    res.status(204).end()
  }
//ELIMINO MENSAJES POR ID
  static async deleteById(req, res) {
    const { params: { id } } = req
    await Messages.deleteM({ _id: id })
    res.status(204).end()
  }

}

export default MessageManagerDB;