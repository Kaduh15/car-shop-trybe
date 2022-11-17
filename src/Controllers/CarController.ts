import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private service: CarService;

  constructor() {
    this.service = new CarService();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const Car: ICar = req.body;

    try {
      const newCar = await this.service.create(Car);
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;