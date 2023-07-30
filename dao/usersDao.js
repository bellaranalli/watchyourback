import userModel from './models/userModel.js'

class Users {
    static createUser(user) {
        return userModel.create(user)
    }

    static getUsers() {
        return userModel.find()
    }

    static getUsersData() {
        return userModel.map(firts_name, last_name, email, role)
    }

    static getUserById(id) {
        return userModel.findById(id)
    }

    static getUserLog(email) {
        return userModel.findOne(email)
    }

    static updateUserById(id, data) {
        return userModel.updateOne({ _id: id }, { $set: data })
    }

    static deleteUser(id) {
        return userModel.deleteOne({ _id: id })
    }

    static deleteInactive(filter) {
        return userModel.deleteMany(filter);
    }

    static lastConnection(last_connection) {
        return userModel.find(last_connection)
    }

    static getUserPremium(email, role) {
        return userModel.findOne(email, role)
    }

    /* static getUserByEmail(email) {
         return userModel.findOne({email: email})
     }
 
     static updatePassword(id, data) {
         return userModel.updateOne({_id: id}, {password: data})
     }*/

}

export default Users