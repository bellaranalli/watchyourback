import mongoose from 'mongoose';

export const init = async() => {
    try {
        const URI = 'mongodb+srv://BellaDev:aNabella1702@cluster0.rvjajgv.mongodb.net/ecommerce?retryWrites=true&w=majority';
        await mongoose.connect(URI);
        console.log('DB Connected');
    } catch (error) {
        console.log('Error:', error.message)
    }
};