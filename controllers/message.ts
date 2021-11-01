import { prisma } from "../db/connection";
import { randomBytes } from "crypto";
import { Request, Response } from "express";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const { text, code } = req.body;
    const id = randomBytes(16).toString("hex");
    const group = await prisma.userGroup.findFirst({
      where: {
        AND: [
          {
            qsssa: {
              accessCode: code,
            },
          },
          {
            UsersOnGroups: {
              some: {
                userId: uid,
              },
            },
          },
        ],
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
