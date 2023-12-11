export type TProducts = {
  _id: string;
  productName: string;
  brand: string;
  price: number;
  description: string;
  stockQuantity: number;
  imageURL: string;
};
export type TCart = TProducts & {
  cartTotalAmount: number;
};
