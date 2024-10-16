import axios from 'axios';

// Get all cars
export const getAllCars = async () => {
  return axios.get('/api/custom-items');
};

// Get a specific car
export const getCar = async (id) => {
  return axios.get(`/api/custom-items/${id}`);
};

// Create a car
export const createCar = async (data) => {
  return axios.post('/api/custom-items', data);
};

// Update a car
export const updateCar = async (id, data) => {
  return axios.put(`/api/custom-items/${id}`, data);
};

// Delete a car
export const deleteCar = async (id) => {
  return axios.delete(`/api/custom-items/${id}`);
};
