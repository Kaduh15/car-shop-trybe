import { Schema, isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import HttpError from '../utils/HttpError';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycles');
  }

  public async findAll(): Promise<IMotorcycle[]> {
    return this.model.find({});
  }

  public async findById(_id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw new HttpError('Invalid mongo id', 422);
    const motorcycle = await this.model.findOne({ _id });

    return motorcycle;
  }
}

export default MotorcycleODM;
