import ICar from '../Interfaces/ICar';

export default class Car {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor({
    id,
    model,
    year,
    color,
    status = false,
    buyValue,
    doorsQty,
    seatsQty,
  }: ICar) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }

  // public setId(id: string) {
  //   this.id = id;
  // }

  // public getId() {
  //   return this.id;
  // }
  
  // public getModel() {
  //   return this.model;
  // }
  
  // public getYear() {
  //   return this.year;
  // }
  
  // public getColor() {
  //   return this.color;
  // }
  
  // public getStatus() {
  //   return this.status;
  // }
  
  // public getBuyValue() {
  //   return this.buyValue;
  // }
  
  // public getDoorsQty() {
  //   return this.doorsQty;
  // }
  
  // public getSeatsQty() {
  //   return this.seatsQty;
  // }
}
