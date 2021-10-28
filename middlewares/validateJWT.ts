import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IAuth {
  uid: string;
}

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(400).json({
        msg: "There's no token",
      });
    }

    const { uid } = verify(token, process.env.JWT_KEY || "") as IAuth;
    req.uid = uid;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Invalid Token",
    });
  }
};
