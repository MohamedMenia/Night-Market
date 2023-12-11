import { Request, Response, NextFunction } from "express";
import { Tuser, UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.create(req.body);
    const token = jwt.sign({ id: user._id }, "secret");

    return res.status(200).json({
      token,
      userID: user._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      if (error.errmsg.includes("email")) {
        return res.status(400).json({
          message: "Email  already exists",
        });
      }
      return res.status(400).json({
        message: "Username  already exists",
      });
    }
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { userInput, password } = req.body;
  try {
    let user: Tuser;
    if (userInput.includes("@")) {
      user = await UserModel.findOne({ email: userInput });
    } else {
      user = await UserModel.findOne({ username: userInput });
    }
    if (!user) {
      return res.status(400).json({
        message: "incorrect username or email",
      });
    }
    const isMatch: Boolean = await UserModel.comparePassword(
      password,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }
    const token = jwt.sign({ id: user._id }, "secret");

    return res.status(200).json({
      token,
      userID: user._id,
    });
  } catch (err) {
    return res.status(500).json({
      massage: "server error",
    });
  }
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.status(403);
      }
      next();
    });
  } else {
    res.status(401);
  }
};
