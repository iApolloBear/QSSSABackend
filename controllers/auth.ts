import { prisma } from "../db/connection";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { generateJWT } from "../helpers/jwt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: { role: true },
    });
    if (!user)
      return res.status(404).json({
        msg: "User Not Found",
      });
    const validPassword = compareSync(password, user.password || "");
    if (!validPassword) return res.status(400).json({ msg: "Wrong Password" });
    const token = await generateJWT(user.id);
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { role, name, email, password } = req.body;
    const id = randomBytes(16).toString("hex");
    const salt = genSaltSync();
    const user = await prisma.user.create({
      data: {
        id: id,
        name: name,
        email: email ? email : null,
        password: password ? hashSync(password, salt) : null,
        role: {
          connect: { role: role ? role : "STUDENT_ROLE" },
        },
      },
      include: {
        role: true,
      },
    });
    const token = await generateJWT(user.id);
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
