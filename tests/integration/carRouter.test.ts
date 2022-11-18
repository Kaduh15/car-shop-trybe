import sinon from 'sinon';
import chai from 'chai';
import request from 'supertest';

import mongoose from 'mongoose';

import app from '../../src/app';
import Car from '../../src/Domains/Car';
import { carsArray, validCar } from '../../__tests__/utils/CarsMock';

const { expect } = chai;

const validId = 'VALID_MONGO_ID';
const invalidId = 'INVALID_MONGO_ID';

describe('---------------------- Rota Cars ----------------------', function () {
  describe('1 - Post /Cars', function () {
    describe('Casos de sucessos', function () {
      it('Cadastra um novo carro.', async function () {
        const newCar = new Car({
          id: '6348513f34c397abcad040b2',
          ...validCar,
        });

        sinon
          .stub(mongoose.Model, 'create')
          .resolves(newCar);
          
        const { body, status } = await request(app)
          .post('/cars')
          .send(validCar);
          
        expect(status).to.equal(201);
        expect(body).to.deep.equal(newCar);

        sinon.restore();
      });
    });
  });
  describe('2 - GET /Cars', function () {
    describe('Casos de sucessos', function () {
      it('Busca todos os carros cadastrados.', async function () {
        const newCar = carsArray.map((car) => new Car({ id: 'VALID_MONGO_ID', ...car }));

        sinon
          .stub(mongoose.Model, 'find')
          .resolves(newCar);
          
        const { body, status } = await request(app)
          .get('/cars');
          
        expect(status).to.equal(200);
        expect(body).to.deep.equal(newCar);

        sinon.restore();
      });
    });
  });
  describe('3 - GET /Cars/:id', function () {
    describe('Casos de Erro ❌.', function () {
      it('Caso o id seja invalido!', async function () {
        sinon.restore();

        sinon
          .stub(mongoose.Model, 'findOne')
          .resolves(null);

        sinon
          .stub(mongoose, 'isValidObjectId')
          .returns(false);
          
        const { body, status } = await request(app)
          .get(`/cars/${invalidId}`);
          
        expect(status).to.equal(422);
        expect(body).to.deep.equal({ message: 'Invalid mongo id' });

        sinon.restore();
      });
      it('Caso id não exista!', async function () {
        sinon.restore();

        sinon
          .stub(mongoose.Model, 'findOne')
          .resolves(null);
        sinon
          .stub(mongoose, 'isValidObjectId')
          .returns(true);
          
        const { body, status } = await request(app)
          .get(`/cars/${validId}`);
          
        expect(status).to.equal(404);
        expect(body).to.deep.equal({ message: 'Car not found' });

        sinon.restore();
      });
    });
    describe('Casos de sucessos ✅', function () {
      it('Busca um carro por id.', async function () {
        const newCar = new Car({
          id: '6348513f34c397abcad040b2',
          ...validCar,
        });

        sinon.restore();

        sinon
          .stub(mongoose.Model, 'findOne')
          .resolves(newCar);
        sinon
          .stub(mongoose, 'isValidObjectId')
          .returns(true);
          
        const { body, status } = await request(app)
          .get(`/cars/${validId}`);
          
        expect(status).to.equal(200);
        expect(body).to.deep.equal(newCar);

        sinon.restore();
      });
    });
  });
  describe('4 - PUT /Cars/:id', function () {
    describe('Casos de Erro ❌.', function () {
      it('Caso o id seja invalido!', async function () {
        sinon.restore();

        sinon
          .stub(mongoose.Model, 'findOne')
          .resolves(null);

        sinon
          .stub(mongoose, 'isValidObjectId')
          .returns(false);
          
        const { body, status } = await request(app)
          .put(`/cars/${invalidId}`)
          .send(validCar);
          
        expect(status).to.equal(422);
        expect(body).to.deep.equal({ message: 'Invalid mongo id' });

        sinon.restore();
      });
      it('Caso id não exista!', async function () {
        sinon.restore();

        sinon
          .stub(mongoose.Model, 'findOne')
          .resolves(null);
        sinon
          .stub(mongoose, 'isValidObjectId')
          .returns(true);
          
        const { body, status } = await request(app)
          .put(`/cars/${validId}`)
          .send(validCar);
          
        expect(status).to.equal(404);
        expect(body).to.deep.equal({ message: 'Car not found' });

        sinon.restore();
      });
    });
    describe('Casos de sucessos ✅', function () {
      it('Atualiza um carro por id.', async function () {
        const updateCar = new Car({
          id: '6348513f34c397abcad040b2',
          ...validCar,
        });

        sinon.restore();

        sinon
          .stub(mongoose.Model, 'findOneAndUpdate')
          .resolves(updateCar);
        sinon
          .stub(mongoose, 'isValidObjectId')
          .returns(true);
          
        const { body, status } = await request(app)
          .put('/cars/VALID_MONGO_ID')
          .send(validCar);
          
        expect(status).to.equal(201);
        expect(body).to.deep.equal(updateCar);

        sinon.restore();
      });
    });
  });
});