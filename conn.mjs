// Get the client
import mysql from 'mysql2/promise';

// Create the conn to database
export const conn = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'exitexam',
})