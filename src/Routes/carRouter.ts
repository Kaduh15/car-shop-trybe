import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carController = new CarController();

const router = Router();

router.get('/cars/:id', (req, res, next) => carController.findById(req, res, next));
router.put('/cars/:id', (req, res, next) => carController.update(req, res, next));
router.get('/cars', (req, res, next) => carController.findAll(req, res, next));
router.post('/cars', (req, res, next) => carController.create(req, res, next));

export default router;