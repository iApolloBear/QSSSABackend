import { prisma } from "../db/connection";
import { Request, Response } from "express";

export const getMyQSSSAStudents = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const uid = req.uid;
    const students = await prisma.usersOnQSSSAS.findMany({
      select: {
        user: { select: { name: true, ready: true, id: true } },
      },
      where: { qsssa: { teacherId: uid, accessCode: code } },
    });
    res.json({
      students,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const getMyStudents = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const students = await prisma.usersOnQSSSAS.findMany({
      distinct: ["userId"],
      include: {
        user: true,
      },
      where: {
        qsssa: {
          teacherId: uid,
        },
      },
    });
    res.json({
      students,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
