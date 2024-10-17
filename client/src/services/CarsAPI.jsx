import axios from 'axios';

// Define the base URL for your backend API
const API_URL = 'http://localhost:3000/api'; // Ensure this matches your actual backend URL

// Fetch all cars
export const getAllCars = async () => {
  try {
    const response = await axios.get(`${API_URL}/custom-items`);
    return response;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

// Fetch a single car by ID
export const getCar = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/custom-items/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
};

// Fetch feature options for exterior color, interior color, wheels, and tint
export const getFeatureOptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/feature-options`);
    return response.data;
  } catch (error) {
    console.error("Error fetching feature options:", error);
    throw error;
  }
};

// Add a new car
export const addCar = async (carData) => {
  try {
    const response = await axios.post(`${API_URL}/custom-items`, carData);
    return response;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};

// Update a car by ID
export const updateCar = async (id, carData) => {
  try {
    const response = await axios.put(`${API_URL}/custom-items/${id}`, carData);
    return response;
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};

// Delete a car by ID
export const deleteCar = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/custom-items/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};
