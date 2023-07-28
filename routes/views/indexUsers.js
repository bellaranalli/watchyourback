import { Router } from 'express';
import userModel from '../../dao/models/userModel.js';
import bodyParser from 'body-parser';

const routerViewUsers = Router();

routerViewUsers.use(bodyParser.urlencoded({ extended: true }))

routerViewUsers.get('/management/:id', async(req, res) => {
    try {
        const  { id }  = req.params
        const user = await userModel.findById(id)
        
        res.render('userManagement', user)
    } catch (error) {
        console.log(error.message);   
    }
    
});

export default routerViewUsers;