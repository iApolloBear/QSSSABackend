import { prisma } from "../db/connection";
import { Request, Response } from "express";

export const getTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await prisma.user.findMany({
      where: {
        role: {
          role: "TEACHER_ROLE",
        },
      },
    });
    res.json({
      teachers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: {
          role: "STUDENT_ROLE",
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
