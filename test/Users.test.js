import mongoose from "mongoose";
import Users from "../dao/usersDao.js";
import Assert from 'assert';

const URL = process.env.NODE_URI;

mongoose.connect(URL);
const assert = Assert.strict;

describe('Testing Users Dao', () => {
    before(function () {
        this.usersDao = new Users();
    });

    it('El Dao debe poder obtener los usuarios en forma de arreglo', async function () {
        console.log(this.usersDao);
        const result = await this.usersDao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    beforeEach(function () {
        this.timeout(5000);
    });
});