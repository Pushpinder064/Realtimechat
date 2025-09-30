import { Request, Response } from "express";
import { prisma } from "../config/db";
import bcrypt from "bcrypt";
import { signJwt } from "../config/jwt";


export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields required" });
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const token = signJwt({ id: user.id });
    const { password: _, ...userSafe } = user;
    res.json({ status: true, user: userSafe, token });
  } catch (err: any) {
  console.error("Register Error:", err);
  if (err.code === 'P2002') {
    return res.status(409).json({ error: "Username or Email already exists" });
  } else {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}


}


export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(400).json({ error: "User not found" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });
  const token = signJwt({ id: user.id });
  const { password: _, ...userSafe } = user;
  res.json({ status: true, user: userSafe, token });
}


export async function allUsers(req: Request, res: Response) {
  const id = req.params.id;
  const users = await prisma.user.findMany({
    where: { NOT: { id } },
    select: {
      id: true,
      username: true,
      email: true,
      avatarImage: true,
      isAvatarImageSet: true,
    }
  });
  res.json(users);
}


export async function setAvatar(req: Request, res: Response) {
  const userId = req.params.id;
  const { image } = req.body;

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      avatarImage: image,
      isAvatarImageSet: true,
    }
  });
  res.json({ isSet: true, image: user.avatarImage });
}


export async function logout(req: Request, res: Response) {
  // The socket mapping is in-memory; clearing is handled by socket.io.
  res.sendStatus(200);
}
