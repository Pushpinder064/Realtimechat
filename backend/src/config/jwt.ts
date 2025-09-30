import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in your environment variables.");
}
const SECRET: Secret = JWT_SECRET; // this tells TS you mean it!

export function signJwt(
  payload: object,
  expiresIn: SignOptions['expiresIn'] = "7d"
): string {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJwt(token: string): string | JwtPayload {
  return jwt.verify(token, SECRET);
}
