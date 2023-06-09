import userModel from './models/userModel.js'

class Users {
    static createUser(user) {
        return userModel.create(user)
    }

    static getUsers() {
        return userModel.find()
    }

    static getUserById(id) {
        return userModel.findById(id)
    }

    static getUserLog(email) {
        return userModel.findOne(email)
    }

    static updateUserById(id, data) {
        return userModel.updateOne({_id: id}, {$set: data})
    }

    static deleteUser(id) {
        return userModel.deleteOne({_id: id})
    }
}

export default Users