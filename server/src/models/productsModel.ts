import { Schema, model } from "mongoose";
import dummy from "mongoose-dummy"
const categories = [
  "Graphic Card",
  "Storage",
  "RAM",
  "Processors",
  "Computer Case",
  "Accessories",
];

export type TProducts = {
  productName: string;
  category: string;
  brand: string;
  price: number;
  description: string;
  stockQuantity: number;
  imageURL: string;
  createdAt: Date;
};
const ProductsSchema = new Schema<TProducts>({
  productName: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: categories,
  },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  imageURL: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const ProductsModel = model<TProducts>("products", ProductsSchema);