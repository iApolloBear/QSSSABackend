import { prisma } from "../db/connection";
import { Request, Response } from "express";

export const getMyGroup = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const uid = req.uid;
    const group = await prisma.userGroup.findFirst({
      include: {
        UsersOnGroups: {
          include: {
            user: {
              include: {
                Answer: {
                  include: {
                    Like: true,
                    Comment: {
                      include: {
                        user: true,
                      },
                    },
                  },
                  where: {
                    group: {
                      AND: [
                        { qsssa: { accessCode: code } },
                        {
                          UsersOnGroups: {
                            some: {
                              userId: uid,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        selected: true,
        Message: {
          include: {
            user: true,
          },
        },
      },
      where: {
        AND: [
          { qsssa: { accessCode: code } },
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
    res.json({
      group,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const setReady = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const user = await prisma.user.update({
      data: {
        ready: true,
      },
      where: {
        id: uid,
      },
    });
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
