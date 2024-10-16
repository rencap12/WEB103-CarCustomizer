import React from 'react'
import '../App.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCar } from '../services/CarsAPI';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCar(id);
        setCar(response.data);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      }
    };
    fetchCar();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{car.name}</h1>
      <p>Features: {JSON.stringify(car.features)}</p>
      <p>Price: {car.price}</p>
      {/* Add any additional details or actions here */}
    </div>
  );
};

export default CarDetails;
