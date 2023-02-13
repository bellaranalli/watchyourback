import express from 'express';
import productRouter from './routes/products.js';

const app = express ();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);

const PORT = 8080;
app.listen(PORT, () =>  console.log("Running on 8080"));