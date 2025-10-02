import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import sequelize from "./models/index.js";
import mpesaRoutes from "./routes/mpesa.js";
import adminRoutes from "./routes/admin.js";
import mikrotikRoutes from "./routes/mikrotik.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use("/api/mpesa", mpesaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mikrotik", mikrotikRoutes);

app.get("/", (req, res) => res.send("Digital Oasis API running."));

// Sync DB
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
});