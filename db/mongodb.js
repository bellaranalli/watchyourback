import mongoose from 'mongoose';

export const init = async () => {
    try {
      await mongoose
      .set('strictQuery', true)
      .connect(process.env.NODE_URI)
      console.log('Database connected')
    } catch (error) {
      console.error('Error to connecto to database', error.message)
    }
  }