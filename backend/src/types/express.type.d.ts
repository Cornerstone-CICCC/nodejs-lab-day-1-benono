// src/types/express.d.ts
import "express";
import { UserPayload } from "./user";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}
