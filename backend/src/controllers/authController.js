import { Admin } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function adminLogin(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) return res.status(401).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
}