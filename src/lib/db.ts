import mysql from "mysql2/promise";

// MySQL connection pool — configured via .env.local
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "sandromigilba_portfolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
