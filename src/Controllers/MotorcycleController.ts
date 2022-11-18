import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private service: MotorcycleService;

  constructor() {
    this.service = new MotorcycleService();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const motorcycle: IMotorcycle = req.body;

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return res.status(201).json(newMotorcycle);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const motorcycles = await this.service.findAll();
      return res.status(200).json(motorcycles);
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.findById(id);
      return res.status(200).json(motorcycle);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body;
    try {
      const motorcycle = await this.service.update(id, data);
      return res.status(200).json(motorcycle);
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcycleController;