import  pool  from './database.js';
import dotenv from 'dotenv';
dotenv.config();

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS CustomItem (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      features JSONB,
      img TEXT,
      price TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  try {
    await pool.query(query);
    console.log('Table created successfully');
  } catch (err) {
    console.error(err);
  }
};

createTable().then(() => pool.end());
