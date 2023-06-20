import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  code: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
  thumbnail: { type: String },
  stock: { type: Number, required: true },
  owner: { type: String, default: 'admin' },
}, { timestamps: true })

productSchema.plugin(mongoosePaginate)

export default mongoose.model('Product', productSchema)

