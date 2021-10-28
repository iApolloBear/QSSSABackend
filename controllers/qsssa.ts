import { prisma } from "../db/connection";
import { Request, Response } from "express";
import { randomBytes } from "crypto";

export const createQSSSA = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const { topic, question, sentenceStem, onlyRecordings } = req.body;
    const id = randomBytes(16).toString("hex");
    const code = randomBytes(16).toString("hex").slice(0, 6);
    const qsssa = await prisma.qsssa.create({
      data: {
        id: id,
        topic: topic,
        question: question,
        sentenceStem: sentenceStem,
        accessCode: code,
        onlyRecordings: onlyRecordings,
        teacher: {
          connect: { id: uid },
        },
      },
      include: {
        teacher: {
          include: {
            role: { select: { role: true } },
          },
        },
      },
    });

    res.json({
      qsssa,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const joinQSSSA = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const uid = req.uid;
    const qsssa = await prisma.usersOnQSSSAS.create({
      data: {
        qsssa: {
          connect: { accessCode: id },
        },
        user: {
          connect: { id: uid },
        },
      },
      include: {
        user: true,
        qsssa: true,
      },
    });
    if (!qsssa)
      return res.status(404).json({
        msg: "QSSSA Not Found",
      });

    res.json({
      qsssa,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
