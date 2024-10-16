import React from 'react'
import '../App.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCar, updateCar } from '../services/CarsAPI';

const EditCar = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [features, setFeatures] = useState({});
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCar(id);
        const car = response.data;
        setName(car.name);
        setFeatures(car.features);
        setPrice(car.price);
      } catch (error) {
        console.error("Failed to fetch car:", error);
      }
    };
    fetchCar();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = { name, features, price };
    try {
      await updateCar(id, carData);
      navigate('/cars'); // Redirect after update
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Car Name"
        required
      />
      {/* Add input fields for features */}
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
        required
      />
      <button type="submit">Update Car</button>
    </form>
  );
};

export default EditCar;
