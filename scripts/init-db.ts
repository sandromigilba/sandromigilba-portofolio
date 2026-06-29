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

async function setupDatabase() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "sandromigilba_portfolio",
  });

  try {
    console.log('Connecting to database...');
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section VARCHAR(50) NOT NULL,
        content_key VARCHAR(100) NOT NULL,
        content_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_section_key (section, content_key)
      );
    `);
    console.log('✅ Created site_content table');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Created admin_users table');

    const [rows] = await pool.query('SELECT * FROM admin_users WHERE username = ?', ['admin']);
    if ((rows as { id: number }[]).length === 0) {
      const password = 'admin';
      const hash = await bcrypt.hash(password, 10);
      await pool.query('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)', ['admin', hash]);
      console.log('✅ Created default admin user (username: admin, password: admin)');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    const [contentRows] = await pool.query('SELECT COUNT(*) as count FROM site_content');
    if ((contentRows as { count: number }[])[0].count === 0) {
      console.log('Seeding default content...');
      const defaultContent = [
        ['Hero', 'title', 'Crafting Premium <br /> <span class="text-brand-blue-accent/80">Web Experiences</span>'],
        ['Hero', 'description', `Hi, I'm <strong class="text-slate-900 dark:text-white font-semibold">Sandro Migilba</strong>. A Full Stack Web Developer. I build modern, high-converting interfaces and robust applications using React, TypeScript, Tailwind CSS, and Framer Motion. Focused on pixel-perfection, speed, and premium design.`],
        
        ['About', 'title', 'About Me'],
        ['About', 'description_p1', `I'm a passionate web developer dedicated to building visually stunning, high-performance applications. With a strong eye for detail, I focus on creating intuitive user experiences that blend aesthetics with deep technical functionality.`],
        ['About', 'description_p2', 'My journey in development has equipped me with expertise across the entire stack—from crafting pixel-perfect frontends to architecting robust backend systems. I thrive in collaborative environments and am constantly exploring new technologies to stay at the forefront of modern web development.'],
        ['About', 'stats_years', '3+'],
        ['About', 'stats_projects', '50+'],
        ['About', 'stats_clients', '20+'],
        ['About', 'stats_awards', '5'],
        
        ['Skills', 'title', 'Tech Stack'],
        ['Skills', 'subtitle', 'Expertise'],
        
        ['Projects', 'title', 'Featured Projects'],
        ['Projects', 'subtitle', 'My Works'],
        
        ['Services', 'title', 'Services I Offer'],
        ['Services', 'subtitle', 'Solutions'],
        
        ['Contact', 'title', 'Get In Touch'],
        ['Contact', 'subtitle', 'Contact'],
        ['Contact', 'heading', "Let's talk about your project"],
        ['Contact', 'description', 'Fill out the form to email me directly, or reach out via my social channels. I usually respond within 24 hours.'],
      ];

      for (const [section, key, value] of defaultContent) {
        await pool.query('INSERT INTO site_content (section, content_key, content_value) VALUES (?, ?, ?)', [section, key, value]);
      }
      console.log('✅ Seeded default content');
    } else {
       console.log('ℹ️ Content already seeded');
    }

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await pool.end();
  }
}

setupDatabase();
