import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

interface UserPayload {
  id: string;
  username: string;
}

export function generateToken(user: UserPayload): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log("checkAuth");
  const isAuthenticated = req.signedCookies.isAuthenticated;
  if (!isAuthenticated) {
    res.status(401).json({ message: "You are not authenticated" });
    return;
  }
  next();
};

export default checkAuth;
