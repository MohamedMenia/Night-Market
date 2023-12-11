import { ProductsModel, TProducts } from "../models/productsModel";
import { Request, Response } from "express";

export const getproducts = async (req: Request, res: Response) => {
  try {
    let products: TProducts[] = [];
    const query = req.query.categories.toString().split(",");
    const page = parseInt(req.query.page as string);
    const limit = 6;
    const skip = (page - 1) * limit;
    if (query.length == 1) {
      products = await ProductsModel.find()
        .sort("createdAt")
        .skip(skip)
        .limit(limit);
    } else {
      products = await ProductsModel.find({
        category: { $in: query },
      })
        .sort("createdAt")
        .skip(skip)
        .limit(limit);
    }

    res.status(200).json({ status: "sucsess", products });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const creatproduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductsModel.create(req.body);
    res.status(200).json({ status: "sucsess", product });
  } catch (err) {
    console.log(err)
    res.status(400).json({ err });
  }
};
export const getproduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductsModel.findById(req.params.id);
    res.status(200).json({ status: "sucsess", product });
  } catch (err) {
    res.status(400).json({ err });
  }
};
