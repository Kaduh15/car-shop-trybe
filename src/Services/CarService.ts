import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CardODM';

class CarService {
  private carODM: CarODM;

  constructor() {
    this.carODM = new CarODM();
  }

  public async create(car: ICar) {
    const newCar = await this.carODM.create(car);
    return new Car(newCar);
  }
}

export default CarService;