import { Nullable } from "../../models/nullable_model";
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
    this.description = description?.length ? description : "";
    this.name = name?.length ? name : "";
    this.price = isNaN(price) ? 0 : price;
  }
  print(): string {
    return `id = ${this.id}}; name = ${this.name}; description = ${this.description}; price = ${this.price}`;
  }
}
