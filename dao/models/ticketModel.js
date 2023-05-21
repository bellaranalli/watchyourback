import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ticket = new mongoose.Schema({
    code: {/*code autogenerado y unico*/ },
    purchase_datetime: {/*fecha y hora de compra*/ },
    amount: {/*precio total */ },
    purchaser: {/*mail de quien realizo la compra*/ }
})

ticket.plugin(mongoosePaginate)

export default mongoose.model('Tickets', ticket)

