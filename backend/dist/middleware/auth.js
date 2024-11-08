"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJWT = authJWT;
const auth_util_1 = require("../utils/auth.util");
function authJWT(req, res, next) {
    console.log("authJWT");
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const decoded = (0, auth_util_1.verifyToken)(token);
    if (!decoded) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
    // @ts-ignore
    req.user = decoded;
    next();
}
