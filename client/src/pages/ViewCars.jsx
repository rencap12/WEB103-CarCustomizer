import React from 'react'
import '../App.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars, deleteCar } from '../services/CarsAPI';

const ViewCar = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getAllCars();
        setCars(response.data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars(cars.filter(car => car.id !== id)); // Remove car from the list after deletion
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <div>
      <h1>All Cars</h1>
      {cars.map(car => (
        <div key={car.id}>
          <h2>{car.name}</h2>
          <p>Price: {car.price}</p>
          <Link to={`/cars/${car.id}`}>Details</Link>
          <Link to={`/cars/edit/${car.id}`}>Edit</Link>
          <button onClick={() => handleDelete(car.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ViewCar;
