import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export const Admin = sequelize.define("admin", {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
});

export const User = sequelize.define("user", {
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "inactive" },
  session_expires_at: { type: DataTypes.DATE },
});

export const Package = sequelize.define("package", {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  duration_minutes: { type: DataTypes.INTEGER, allowNull: false },
  speed_limit: { type: DataTypes.STRING },
});

export const Router = sequelize.define("router", {
  name: { type: DataTypes.STRING, allowNull: false },
  ip: { type: DataTypes.STRING, allowNull: false },
  api_port: { type: DataTypes.INTEGER, defaultValue: 8728 },
  username: { type: DataTypes.STRING, allowNull: false },
  password_encrypted: { type: DataTypes.STRING, allowNull: false },
});

export const Payment = sequelize.define("payment", {
  transaction_id: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  amount: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING },
});

// Associations
User.belongsTo(Package, { as: "current_package" });
Package.belongsTo(Router);
Payment.belongsTo(User);
Payment.belongsTo(Package);

export default sequelize;