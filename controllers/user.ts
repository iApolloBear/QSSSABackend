import { prisma } from "../db/connection";
import { genSaltSync, hashSync } from "bcryptjs";
import { randomBytes } from "crypto";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { role, name, email, password } = req.body;
    const id = randomBytes(16).toString("hex");
    const salt = genSaltSync();
    const user = await prisma.user.create({
      data: {
        id: id,
        name: name,
        email: email ? email : null,
        password: password ? hashSync(password, salt) : null,
        role: {
          connect: { role: role },
        },
      },
      include: {
        role: true,
      },
    });
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
