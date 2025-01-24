import sqlite3 from "sqlite3";

const db = new sqlite3.Database('./user.db');

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Database and table created successfully.");
      }
    });
  });

export {db}