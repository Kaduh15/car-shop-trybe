import sinon from 'sinon';
import chai from 'chai';
import request from 'supertest';

import mongoose from 'mongoose';
import { motorcyclesArray, validMotorcycle } from '../../__tests__/utils/MotorcyclesMock';

import app from '../../src/app';
import Motorcycle from '../../src/Domains/Motorcycle';

const { expect } = chai;

const validId = 'VALID_MONGO_ID';
const invalidId = 'INVALID_MONGO_ID';

describe('---------------------- Rota Motorcycles ----------------------', function () {
  describe('1 - Post /motorcycles', function () {
    describe('Casos de sucessos', function () {
      it('Cadastra um novo carro.', async function () {
        const newMotorcycles = new Motorcycle({
          id: '6348513f34c397abcad040b2',
          ...validMotorcycle,
        });

        sinon
          .stub(mongoose.Model, 'create')
          .resolves(newMotorcycles);

        const { body, status } = await request(app)
          .post('/motorcycles')
          .send(validMotorcycle);

        expect(status).to.equal(201);
        expect(body).to.deep.equal(newMotorcycles);

        sinon.restore();
      });
    });
  });
  describe('2 - GET /Motorcycles', function () {
    describe('Casos de sucessos', function () {
      it('Busca todos os carros cadastrados.', async function () {
        const newMotorcycles = motorcyclesArray.map((car) =>
          new Motorcycle({ id: 'VALID_MONGO_ID', ...car }));

        sinon
          .stub(mongoose.Model, 'find')
          .resolves(newMotorcycles);

        const { body, status } = await request(app)
          .get('/motorcycles');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(newMotorcycles);

        sinon.restore();
      });
    });
  });
  describe('3 - GET /motorcycles/:id', function () {
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
          .get(`/motorcycles/${invalidId}`);

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
          .get(`/motorcycles/${validId}`);

        expect(status).to.equal(404);
        expect(body).to.deep.equal({ message: 'Motorcycle not found' });

        sinon.restore();
      });
    });
    describe('Casos de sucessos ✅', function () {
      it('Busca um carro por id.', async function () {
        const newCar = new Motorcycle({
          id: '6348513f34c397abcad040b2',
          ...validMotorcycle,
        });

        sinon.restore();

        sinon
          .stub(mongoose.Model, 'findOne')
          .resolves(newCar);
        sinon
          .stub(mongoose, 'isValidObjectId')
          .returns(true);

        const { body, status } = await request(app)
          .get(`/motorcycles/${validId}`);

        expect(status).to.equal(200);
        expect(body).to.deep.equal(newCar);

        sinon.restore();
      });
    });
  });
  describe('4 - PUT /motorcycles/:id', function () {
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
          .put(`/motorcycles/${invalidId}`)
          .send(validMotorcycle);

        expect(status).to.equal(422);
        expect(body).to.deep.equal({ message: 'Invalid mongo id' });

        sinon.restore();
      });
      it('Caso id não exista!', async function () {
        sinon.restore();

        sinon
          .stub(mongoose.Model, 'findOneAndUpdate')
          .resolves(null);
        sinon
          .stub(mongoose, 'isValidObjectId')
          .returns(true);

        const { body, status } = await request(app)
          .put(`/motorcycles/${validId}`)
          .send(validMotorcycle);

        expect(status).to.equal(404);
        expect(body).to.deep.equal({ message: 'Motorcycle not found' });

        sinon.restore();
      });
    });
    describe('Casos de sucessos ✅', function () {
      it('Atualiza um carro por id.', async function () {
        const updateCar = new Motorcycle({
          id: '6348513f34c397abcad040b2',
          ...validMotorcycle,
        });

        sinon.restore();

        sinon
          .stub(mongoose.Model, 'findOneAndUpdate')
          .resolves(updateCar);
        sinon
          .stub(mongoose, 'isValidObjectId')
          .returns(true);

        const { body, status } = await request(app)
          .put('/motorcycles/VALID_MONGO_ID')
          .send(validMotorcycle);

        expect(status).to.equal(200);
        expect(body).to.deep.equal(updateCar);

        sinon.restore();
      });
    });
  });
});
