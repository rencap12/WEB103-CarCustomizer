import  pool from '../config/database.js';

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

// Get all feature options
export const getFeatureOptions = async (req, res) => {
  try {
    const [exteriorColors] = await pool.query('SELECT * FROM ExteriorColor');
    const [interiorColors] = await pool.query('SELECT * FROM InteriorColor');
    const [wheels] = await pool.query('SELECT * FROM Wheels');
    const [tinted] = await pool.query('SELECT * FROM Tinted');
    
    res.json({
      exteriorColors,
      interiorColors,
      wheels,
      tinted
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch feature options');
  }
};

// Update car with new features
export const updateCustomItem = async (req, res) => {
  const { id } = req.params;
  const { name, features, price, img_url } = req.body;
  
  const query = `
    UPDATE CustomItem 
    SET name = $1, features = $2, price = $3, img_url = $4
    WHERE id = $5
  `;
  try {
    await pool.query(query, [name, features, price, img_url, id]);
    res.status(200).send('Car updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to update car');
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
