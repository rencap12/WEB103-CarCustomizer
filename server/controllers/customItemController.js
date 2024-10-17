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

// get specific details of car
export const getCustomItemDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM CustomItem WHERE id = $1', [id]);
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
    // Query the database for each feature type
    const exteriorColorsQuery = await pool.query('SELECT * FROM ExteriorColor');
    const interiorColorsQuery = await pool.query('SELECT * FROM InteriorColor');
    const wheelsQuery = await pool.query('SELECT * FROM Wheels');
    const tintsQuery = await pool.query('SELECT * FROM Tinted');

    // Ensure the queries return arrays, otherwise handle accordingly
    const exteriorColors = exteriorColorsQuery.rows || [];
    const interiorColors = interiorColorsQuery.rows || [];
    const wheels = wheelsQuery.rows || [];
    const tints = tintsQuery.rows || [];



    // Check if any of the queries returned undefined or null
    if (!Array.isArray(exteriorColors) || !Array.isArray(interiorColors) || !Array.isArray(wheels) || !Array.isArray(tints)) {
      throw new Error('Failed to fetch feature options.');
    }

    // Respond with the combined feature options
    res.json({
      exteriorColors,
      interiorColors,
      wheels,
      tints,
    });
  } catch (error) {
    console.error('Error fetching feature options:', error);
    res.status(500).json({ message: 'Failed to retrieve feature options.' });
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

// Get all exterior colors
export const getExteriorColors = async (req, res) => {
  try {
    console.log('Querying database for exterior colors...');
    const result = await pool.query('SELECT * FROM ExteriorColor');
    // const exteriorColors = result.rows.map(row => row.color);
    // console.log((result.rows));
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching exterior colors:', error);
    res.status(500).json({ message: 'Failed to retrieve exterior colors.' });
  }
};

// Get all interior colors
export const getInteriorColors = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM InteriorColor');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching interior colors:', error);
    res.status(500).json({ message: 'Failed to retrieve interior colors.' });
  }
};

// Get all wheels
export const getWheels = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Wheels');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching wheels:', error);
    res.status(500).json({ message: 'Failed to retrieve wheels.' });
  }
};

// Get all tint options
export const getTints = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Tinted');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching tint options:', error);
    res.status(500).json({ message: 'Failed to retrieve tints.' });
  }
};

// Update a car with selected features
export const updateCarFeatures = async (req, res) => {
  const { id } = req.params;
  const { features } = req.body; // Expecting features object with selected options
  try {
    // Convert features JSON to string for saving in the database
    const result = await pool.query(
      'UPDATE CustomItem SET features = $1 WHERE id = $2 RETURNING *',
      [features, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating car features:', error);
    res.status(500).json({ message: 'Failed to update car features.' });
  }
};
