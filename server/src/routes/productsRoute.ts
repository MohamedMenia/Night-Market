import { Router } from "express";
import { verifyToken } from "../controllers/userController";
import {getproducts,creatproduct,getproduct }from "../controllers/productsController";

const router = Router();

router.route("/")
      .get(verifyToken, getproducts)
      .post( creatproduct);
      
router.route("/:id").get(verifyToken,getproduct)

//router.post("/checkout", verifyToken);

export { router as productsRouter };
