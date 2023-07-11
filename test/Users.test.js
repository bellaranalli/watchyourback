import mongoose from "mongoose";
import Users from "../dao/usersDao.js";
import Assert from 'assert';

mongoose.connect('mongodb+srv://BellaDev:aNabella1702@cluster0.rvjajgv.mongodb.net/ecommerce?retryWrites=true&w=majority')
const assert = Assert.strict;

describe('Testing Users Dao', () => {
    before( async function () {    
        this.usersDao =  Users;
    });

    it('El Dao debe poder obtener los usuarios en forma de arreglo', async function () {
        console.log(this.usersDao);
        const result = await this.usersDao.getUsers();
        assert.strictEqual(Array.isArray(result), true);
    });

    beforeEach(function () {
        this.timeout(5000);
    });
});