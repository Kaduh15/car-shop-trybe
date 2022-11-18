import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import HttpError from '../utils/HttpError';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;

  constructor() {
    this.motorcycleODM = new MotorcycleODM();
  }

  public async create(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    return new Motorcycle(newMotorcycle);
  }

  public async findAll() {
    const motorcycles = await this.motorcycleODM.findAll();
    return motorcycles.map((motorcycle) => new Motorcycle(motorcycle));
  }

  public async findById(id: string) {
    const motorcycle = await this.motorcycleODM.findById(id);
    if (motorcycle) return new Motorcycle(motorcycle);
    throw new HttpError('Motorcycle not found', 404);
  }

  public async update(id: string, data: IMotorcycle) {
    const motorcycle = await this.motorcycleODM.update(id, data);
    if (motorcycle) return new Motorcycle(motorcycle);
    throw new HttpError('Motorcycle not found', 404);
  }
}

export default MotorcycleService;