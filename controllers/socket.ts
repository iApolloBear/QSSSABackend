import { prisma } from "../db/connection";

export const getStudents = async (code: string) => {
  try {
    const students = await prisma.usersOnQSSSAS.findMany({
      select: {
        user: true,
      },
      where: {
        qsssa: {
          accessCode: code,
        },
      },
    });
    return students;
  } catch (err) {
    console.log(err);
    return [];
  }
};
