import mysql from "mysql2";
import { config } from "dotenv";
config();
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set!");
}
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");
connection.end();
