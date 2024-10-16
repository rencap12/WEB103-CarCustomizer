import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve('./config/.env') });

const config = {
    connectionString: process.env.CONNECTION
}

const pool = new pg.Pool(config);
console.log('CONNECTION TO DATABASE', config);

pool.connect()
  .then(client => {
    console.log('Successfully connected to the database!');
    client.release(); // Release the client after use
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });


export default pool;
