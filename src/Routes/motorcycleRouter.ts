import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleController = new MotorcycleController();

const router = Router();

router.get('/motorcycles/:id', (req, res, next) => motorcycleController.findById(req, res, next));
router.put('/motorcycles/:id', (req, res, next) => motorcycleController.update(req, res, next));
router.get('/motorcycles', (req, res, next) => motorcycleController.findAll(req, res, next));
router.post('/motorcycles', (req, res, next) => motorcycleController.create(req, res, next));

export default router;