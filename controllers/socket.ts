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

export const getMessages = async (groupId: string) => {
  try {
    const group = await prisma.userGroup.update({
      data: {
        active: true,
      },
      where: {
        id: groupId,
      },
    });
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: true,
      },
      where: {
        groupId: groupId,
      },
    });
    return { messages, group };
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getUserMessages = async (groupId: string) => {
  try {
    const users = await prisma.message.findMany({
      distinct: "userId",
      include: {
        user: {
          include: {
            Answer: {
              include: {
                Comment: {
                  include: { user: true },
                },
                Like: true,
              },
              where: {
                groupId: groupId,
              },
            },
          },
        },
      },
      where: {
        groupId: groupId,
      },
    });
    return users;
  } catch (err) {
    console.log(err);
    return [];
  }
};
