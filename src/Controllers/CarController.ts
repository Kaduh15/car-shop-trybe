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

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await this.service.findAll();
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const car = await this.service.findById(id);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body;
    try {
      const car = await this.service.update(id, data);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;