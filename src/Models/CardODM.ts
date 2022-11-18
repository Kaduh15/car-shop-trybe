import { Schema, isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import HttpError from '../utils/HttpError';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Cars');
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find({});
  }

  public async findById(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw new HttpError('Invalid mongo id', 422);
    const car = await this.model.findOne({ _id });

    return car;
  }
}

export default CarODM;