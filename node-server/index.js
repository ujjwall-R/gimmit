const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(client => {
    console.log("Connected to the database.");
    client.release();
  })
  .catch(err => console.error("Database connection error:", err.stack));

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Node.js Central Server is running!');
});

app.listen(4000, () => {
  console.log('Node.js server listening on port 4000');
});
