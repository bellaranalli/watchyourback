import mongoose from 'mongoose'

const message = new mongoose.Schema({
  user: { type: String, require: true },
  message: { type: String, require: true }
}, { timestamps: true })

export default mongoose.model('Message', message)