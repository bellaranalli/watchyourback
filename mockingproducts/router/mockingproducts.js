import { Router } from 'express'

import { generateProduct } from '../utils/index.js'

const routerMock = Router()

routerMock.get('/mockingproducts', (req, res) => {
    const { count = 100 } = req.query
    const products = []
    for (let i = 0; i < count; i++) {
        products.push(generateProduct())
    }
    res.status(200).json({ status: true, payload: products })
})

export default routerMock