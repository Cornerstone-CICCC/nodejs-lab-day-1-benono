"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
function generateToken(user) {
    return jsonwebtoken_1.default.sign(user, JWT_SECRET, { expiresIn: "1h" });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
}
const checkAuth = (req, res, next) => {
    console.log("checkAuth");
    const isAuthenticated = req.signedCookies.isAuthenticated;
    if (!isAuthenticated) {
        res.status(401).json({ message: "You are not authenticated" });
        return;
    }
    next();
};
exports.default = checkAuth;
