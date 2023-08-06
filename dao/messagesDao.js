import messageModel from "./models/messageModel.js"

class Messages {
    static createMessage(body) {
        return messageModel.create(body);
      }

    static getMessages() {
        return messageModel.find()
    }


    static getMessageById(id) {
        return messageModel.findById(id)
    }



    static updateMById(id, data) {
        return messageModel.updateOne({ _id: id }, { $set: data })
    }

    static deleteM(id) {
        return messageModel.deleteOne({ _id: id })
    }


}

export default Messages