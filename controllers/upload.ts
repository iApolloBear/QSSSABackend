import { prisma } from "../db/connection";
import { Request, Response } from "express";
import path from "path";
import { existsSync } from "fs";

export const getFile = async (req: Request, res: Response) => {
  const { collection, id } = req.params;
  let model;
  switch (collection) {
    case "qsssas":
      model = await prisma.qsssa.findUnique({ where: { accessCode: id } });
      if (!model) {
        return res.status(404).json({
          msg: `${collection} not found`,
        });
      }
      break;
    /*case "answers":
      model = await Answer.findById(id);
      if (!model) {
        return res.status(404).json({ msg: `${collection} not found` });
      }
      break;*/

    default:
      return res.status(500).json({ msg: "Collection not found" });
  }

  /*if (model.audio) {
    const audioPath = path.join(
      __dirname,
      `../../uploads/audio/${model.audio}`
    );
    if (existsSync(audioPath)) {
      return res.sendFile(audioPath);
    }
  }*/

  if (model.img) {
    const imgPath = path.join(__dirname, `../../uploads/images/${model.img}`);
    if (existsSync(imgPath)) {
      return res.sendFile(imgPath);
    }
  }

  res.json({ model });
};
