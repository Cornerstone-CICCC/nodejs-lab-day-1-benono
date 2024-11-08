import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth.util";

export function authJWT(req: Request, res: Response, next: NextFunction) {
  console.log("authJWT");

  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
  // @ts-ignore
  req.user = decoded;
  next();
}
