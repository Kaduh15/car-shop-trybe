import sinon from 'sinon';
import chai from 'chai';
import request from 'supertest';

import { Model } from 'mongoose';

import app from '../../src/app';
import Car from '../../src/Domains/Car';
import { validCar } from '../../__tests__/utils/CarsMock';

const { expect } = chai;

describe('---------------------- Rota Cars ----------------------', function () {
  describe('1 - Post /Cars', function () {
    describe('Casos de sucessos', function () {
      it('Cadastra um novo carro.', async function () {
        const newCar = new Car({
          id: '6348513f34c397abcad040b2',
          ...validCar,
        });

        sinon
          .stub(Model, 'create')
          .resolves(newCar);
          
        const { body, status } = await request(app)
          .post('/cars')
          .send(validCar);
          
        expect(status).to.equal(201);
        expect(body).to.deep.equal(newCar);
      });
    });
  });
});