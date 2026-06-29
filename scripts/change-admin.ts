import 'dotenv/config';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { parse } from 'dotenv';

const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envConfig = parse(fs.readFileSync(envLocalPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

async function changeAdminCredentials() {
  const args = process.argv.slice(2);
  
  if (args.length !== 2) {
    console.error('Usage: npx tsx scripts/change-admin.ts <new_username> <new_password>');
    process.exit(1);
  }

  const newUsername = args[0];
  const newPassword = args[1];

  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "sandromigilba_portfolio",
  });

  try {
    console.log('Connecting to database...');
    
    // Check if any admin user exists
    const [rows] = await pool.query('SELECT * FROM admin_users LIMIT 1');
    const users = rows as any[];

    const hash = await bcrypt.hash(newPassword, 10);

    if (users.length === 0) {
      // Create new if doesn't exist
      await pool.query('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)', [newUsername, hash]);
      console.log(`✅ Admin user created successfully with username: ${newUsername}`);
    } else {
      // Update the first admin user found
      const existingId = users[0].id;
      await pool.query('UPDATE admin_users SET username = ?, password_hash = ? WHERE id = ?', [newUsername, hash, existingId]);
      console.log(`✅ Admin credentials updated successfully to username: ${newUsername}`);
    }

  } catch (error) {
    console.error('Error updating credentials:', error);
  } finally {
    await pool.end();
  }
}

changeAdminCredentials();
