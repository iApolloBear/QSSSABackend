import { prisma } from "../db/connection";
import { randomBytes } from "crypto";
import { Request, Response } from "express";

export const createRole = async (req: Request, res: Response) => {
  try {
    const { role: reqRole } = req.body;
    const id = randomBytes(16).toString("hex");
    const role = await prisma.role.create({
      data: {
        id: id,
        role: reqRole,
      },
    });
    res.json({
      role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
