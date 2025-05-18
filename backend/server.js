const express = require('express');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool(); // Uses .env by default

// Get all users
app.get('/api/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json({ users: result.rows });
});

// Create a user
app.post('/api/users', async (req, res) => {
  const { name, phone } = req.body;
  const id = uuidv4();
  await pool.query('INSERT INTO users (id, name, phone) VALUES ($1, $2, $3)', [id, name, phone]);
  res.status(201).json({ id, name, phone });
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  res.sendStatus(204);
});

app.listen(5432, () => {
  console.log('Backend running on port 5000');
});
