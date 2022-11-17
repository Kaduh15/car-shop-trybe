import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carController = new CarController();

const router = Router();

router.post('/cars', (req, res, next) => carController.create(req, res, next));

export default router;