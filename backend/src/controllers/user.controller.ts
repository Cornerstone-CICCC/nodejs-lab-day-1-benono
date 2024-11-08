import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";
import { compareHash, hashed } from "../utils/hash.util";
import { generateToken } from "../utils/auth.util";
import { UserPayload } from "../types/user";
// Get users
const getUsers = (req: Request, res: Response) => {
  const users = userModel.findAll();
  res.json(users);
};

// Get user by id
const getUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const user = userModel.findById(id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user);
};

// Get user by username
const getUserByUsername = (
  req: Request<{ username: string }>,
  res: Response
) => {
  const { username } = req.params;
  const user = userModel.findByUsername(username);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user);
};

// Add user
const addUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { username, password, firstname, lastname } = req.body;
  const hashedPassword = await hashed(password);
  const user = userModel.create({
    username,
    password: hashedPassword,
    firstname: firstname,
    lastname: lastname,
  });
  res.status(201).json(user);
};

// Update user by id
const updateUserById = (
  req: Request<{ id: string }, {}, User>,
  res: Response
) => {
  const { id } = req.params;
  const { username, firstname, lastname } = req.body;
  const user = userModel.update(id, { username, firstname, lastname });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
};

// Delete user by id
const deleteUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const isDeleted = userModel.delete(id);
  if (!isDeleted) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).send("User deleted!");
};

// Login user
const loginUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { username, password } = req.body;
  const user = userModel.findByUsername(username);
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const isMatch = await compareHash(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const token = generateToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3 * 60 * 1000,
  });
  res.status(200).json({ message: "Login authenticated" });
};

const checkAuth = (req: Request, res: Response) => {
  // @ts-ignore
  const { username } = req.user;
  res.status(200).json({ username });
};

export default {
  addUser,
  loginUser,
  getUsers,
  getUserById,
  getUserByUsername,
  updateUserById,
  deleteUserById,
  checkAuth,
};
