import { prisma } from "../db/connection";
import { randomBytes } from "crypto";
import { Request, Response } from "express";

export const createLike = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const { answerId } = req.body;
    const id = randomBytes(16).toString("hex");
    const like = await prisma.like.findFirst({
      where: {
        userId: uid,
        answerId: answerId,
      },
    });
    if (like) {
      await prisma.like.delete({ where: { id: like.id } });
      return res.json({ msg: "Like Deleted" });
    }
    const comment = await prisma.like.create({
      data: {
        id: id,
        userId: uid,
        answerId: answerId,
      },
    });
    res.json({ comment });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
