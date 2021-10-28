import { prisma } from "../db/connection";
import { compareSync } from "bcryptjs";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user)
      return res.status(404).json({
        msg: "User Not Found",
      });
    const validPassword = compareSync(password, user.password || "");
    if (!validPassword) return res.status(400).json({ msg: "Wrong Password" });
    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
