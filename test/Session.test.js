import chai from 'chai';
import supertest from 'supertest';

const { expect } = chai;
const api = supertest('http://localhost:8080'); // Cambia la URL según corresponda

describe('API Tests', () => {
  describe('POST /register', () => {
    it('Debe registrar un nuevo usuario', async () => {
      const newUser = {
        first_name: 'Pepito',
        last_name: 'Pepito',
        email: `pp${Date.now()}@email.com`,
        edad: 33,
        password: '123',
      };

      const response = await api.post('/register').send(newUser);
      console.log(response.body);
    });
  });
});