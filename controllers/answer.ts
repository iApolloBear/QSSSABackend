import { prisma } from "../db/connection";
import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { uploadBlob } from "../helpers/uploadFile";

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const { groupId } = req.body;
    const id = randomBytes(16).toString("hex");
    const name = await uploadBlob(req.files, "mp3", "audio");
    let answer = await prisma.answer.findFirst({
      where: {
        AND: [{ userId: uid }, { groupId: groupId }],
      },
    });
    if (answer)
      await prisma.answer.delete({
        where: {
          id: answer.id,
        },
      });
    const group = await prisma.userGroup.findFirst({
      where: {
        id: groupId,
      },
    });
    if (!group)
      return res.status(404).json({
        msg: "Group Not Found",
      });
    answer = await prisma.answer.create({
      data: {
        id: id,
        audio: name,
        userId: uid,
        groupId: group.id,
      },
    });
    res.json({ answer });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
