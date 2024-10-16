import pool from '../config/database.js';

// Get all custom items
export const getCustomItems = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM CustomItem');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new custom item
export const addCustomItem = async (req, res) => {
  const { name, features, price } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO CustomItem (name, features, price) VALUES ($1, $2, $3) RETURNING *',
      [name, features, price]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a custom item
export const updateCustomItem = async (req, res) => {
  const { id } = req.params;
  const { name, features, price } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE CustomItem SET name=$1, features=$2, price=$3 WHERE id=$4 RETURNING *',
      [name, features, price, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a custom item
export const deleteCustomItem = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM CustomItem WHERE id=$1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
