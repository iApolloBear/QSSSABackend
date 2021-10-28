import { prisma } from "../db/connection";
import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { sliceIntoChunks } from "../helpers/sliceIntoChunks";
import randomColor from "randomcolor";

export const createGroups = async (req: Request, res: Response) => {
  try {
    const { code, groups, identifier } = req.body;
    const qsssa = await prisma.usersOnQSSSAS.findMany({
      where: { qsssa: { accessCode: code } },
    });
    if (!qsssa)
      return res.status(404).json({
        msg: "QSSSA Not Found",
      });
    const chunkSize = Math.ceil(qsssa.length / groups.length);
    const chunks: any[][] = sliceIntoChunks(qsssa, chunkSize);
    const colors = randomColor({ luminosity: "light", count: 36 });
    for (let i = 0; i < groups.length; i++) {
      let id = randomBytes(16).toString("hex");
      let group = await prisma.userGroup.create({
        data: {
          id: id,
          name: groups[i],
          color: colors[i],
          identifier: identifier ? identifier : "",
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
