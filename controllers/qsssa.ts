import { prisma } from "../db/connection";
import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { uploadFile } from "../helpers/uploadFile";

export const getQSSSAS = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const role = await prisma.user.findUnique({
      select: {
        role: {
          select: { role: true },
        },
      },
      where: {
        id: uid,
      },
    });
    if (!role)
      return res.status(404).json({ msg: "This user doesn't have role" });
    let qsssas;
    switch (role.role.role) {
      case "STUDENT_ROLE":
        qsssas = await prisma.qsssa.findMany({
          where: {
            UsersOnQSSSAS: {
              some: {
                userId: uid,
              },
            },
          },
        });
        break;
      case "TEACHER_ROLE":
        qsssas = await prisma.qsssa.findMany({
          select: {
            topic: true,
            question: true,
            sentenceStem: true,
            accessCode: true,
          },
          where: {
            teacherId: uid,
          },
        });
        break;
      case "ADMIN_ROLE":
        qsssas = await prisma.qsssa.findMany();
      default:
        qsssas = await prisma.qsssa.findMany();
        break;
    }
    res.json({ qsssas });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const createQSSSA = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const { topic, question, sentenceStem, onlyRecordings } = req.body;
    const id = randomBytes(16).toString("hex");
    const code = randomBytes(16).toString("hex").slice(0, 6);
    let name;
    if (req.files) {
      name = await uploadFile(req.files, ["png", "jpg", "jpeg"], "images");
    }
    const qsssa = await prisma.qsssa.create({
      data: {
        id: id,
        topic: topic,
        question: question,
        sentenceStem: sentenceStem,
        accessCode: code,
        img: name,
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

export const getQSSSA = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const qsssa = await prisma.qsssa.findUnique({
      where: { accessCode: code },
    });
    if (!qsssa) return res.status(404).json({ msg: "QSSSA Not Found" });
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
