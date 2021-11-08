import { prisma } from "../db/connection";
import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { sliceIntoChunks } from "../helpers/sliceIntoChunks";
import randomColor from "randomcolor";

export const createGroups = async (req: Request, res: Response) => {
  try {
    const { code, groups, identifier } = req.body;
    const qsssa = await prisma.qsssa.findUnique({
      include: { UsersOnQSSSAS: true },
      where: { accessCode: code },
    });
    if (!qsssa)
      return res.status(404).json({
        msg: "QSSSA Not Found",
      });
    const chunkSize = Math.ceil(qsssa.UsersOnQSSSAS.length / groups.length);
    const chunks: any[][] = sliceIntoChunks(qsssa.UsersOnQSSSAS, chunkSize);
    const colors = randomColor({ luminosity: "light", count: 36 });
    for (let i = 0; i < groups.length; i++) {
      let id = randomBytes(16).toString("hex");
      let group = await prisma.userGroup.create({
        data: {
          id: id,
          name: groups[i],
          color: colors[i],
          identifier: identifier ? identifier : null,
          qsssaId: qsssa.id,
          selectedId: identifier
            ? null
            : chunks[i][Math.floor(Math.random() * chunks[i].length)].userId,
        },
      });
      if (chunks[i] !== undefined && chunks[i].length > 0) {
        chunks[i].map(async (chunk) => {
          await prisma.usersOnGroups.create({
            data: {
              userId: chunk.userId,
              groupId: group.id,
            },
          });
        });
      }
    }
    res.json({
      msg: "ok",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const getQSSSAGroups = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    let groups = await prisma.userGroup.findMany({
      include: {
        UsersOnGroups: {
          include: {
            user: {
              include: {
                Answer: {
                  where: {
                    group: {
                      qsssa: {
                        accessCode: code,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: {
        qsssa: { accessCode: code },
      },
    });
    res.json({
      groups,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
