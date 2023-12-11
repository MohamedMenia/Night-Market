import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { BlockLike } from "typescript";

export type Tuser = {
  _id: any;
  id?: string;
  email: string;
  username: string;
  password: string;
  orders: { productID: string; Quantity: number }[];
};
interface UserModel extends Model<Tuser> {
  comparePassword(password: String, dpPassword: String): Promise<Boolean>;
}

const UserSchema = new Schema<Tuser, UserModel>({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  orders: [
    [
      {
        productID: { type: String, ref: "products" },
        Quantity: Number,
        
      },
    ],
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.static("comparePassword", async function (password, dpPassword) {
  return await bcrypt.compare(password, dpPassword);
});

export const UserModel = model<Tuser, UserModel>("User", UserSchema);
