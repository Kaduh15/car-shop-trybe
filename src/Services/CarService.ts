import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CardODM';
import HttpError from '../utils/HttpError';

class CarService {
  private carODM: CarODM;

  constructor() {
    this.carODM = new CarODM();
  }

  public async create(car: ICar) {
    const newCar = await this.carODM.create(car);
    return new Car(newCar);
  }

  public async findAll() {
    const cars = await this.carODM.findAll();
    return cars.map((car) => new Car(car));
  }

  public async findById(id: string) {
    const car = await this.carODM.findById(id);
    if (car) return new Car(car);
    throw new HttpError('Car not found', 404);
  }
}

export default CarService;