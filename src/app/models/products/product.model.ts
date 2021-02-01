import { ProductItemModel } from "./product-item.model";

export class ProductModel {
  name: string;
  description: string;
  price: number;
  image: string;
  expiration_date: Date;
  listDescriptions: Array<ProductItemModel>
}
