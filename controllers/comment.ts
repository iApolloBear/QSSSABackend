import { prisma } from "../db/connection";
import { randomBytes } from "crypto";
import { Request, Response } from "express";

export const createComment = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const { text, answerId } = req.body;
    const id = randomBytes(16).toString("hex");
    const comment = await prisma.comment.create({
      data: {
        id: id,
        text: text,
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
