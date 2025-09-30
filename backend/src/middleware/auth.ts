import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string }; // match the payload used in signJwt
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = { id: decoded.id }; // assuming your JWT only has { id: ... }
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(403).json({ error: "Invalid or expired token. Please login again." });
  }
}
