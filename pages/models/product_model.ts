import { Nullable } from "./nullable_model";
export interface Product {
  readonly id: Nullable<number>;
  readonly name: string;
  readonly price: number;
  readonly description: string;
}

// I have added the class for possible runtime checking in the future
// like check correct of data, convert date to/from UTC, parsing arrays etc...
export class ModelProduct implements Product {
  readonly id: Nullable<number>;
  readonly name: string;
  readonly price: number;
  readonly description: string;

  constructor({
    id = null,
    description = "",
    name = "",
    price = 0,
  }: Partial<Product> = {}) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.price = price;
  }
}
