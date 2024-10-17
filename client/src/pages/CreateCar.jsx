import React from 'react'
import '../App.css'
import { useState } from 'react';
import { addCar } from '../services/CarsAPI';
import { useNavigate } from 'react-router-dom';

const CreateCar = () => {
  const [name, setName] = useState('');
  const [features, setFeatures] = useState({});
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = { name, features, price };
    try {
      await addCar(carData);
      alert('Car Created!');
      //navigate('/cars'); // Redirect to car list after creation
    } catch (error) {
      console.error("Failed to create car:", error);
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
      <button type="submit">Create Car</button>
    </form>
  );
};

export default CreateCar;
