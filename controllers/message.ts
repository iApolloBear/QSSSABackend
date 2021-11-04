import { prisma } from "../db/connection";
import { randomBytes } from "crypto";
import { Request, Response } from "express";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const { text, groupId } = req.body;
    const id = randomBytes(16).toString("hex");
    const group = await prisma.userGroup.findFirst({
      where: {
        id: groupId,
      },
    });
    if (!group)
      return res.status(404).json({
        msg: "Group Not Found",
      });
    const message = await prisma.message.create({
      data: {
        id: id,
        text: text,
        userId: uid,
        groupId: group.id,
      },
    });
    res.json({ message });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const meesages = prisma.message.findMany({
      where: {
        groupId: id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
