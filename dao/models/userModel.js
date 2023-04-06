import mongoose from 'mongoose'

const user = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
})

export default mongoose.model('User', user)