import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getAllCars, deleteCar } from '../services/CarsAPI';

const ViewCar = () => {
  const [cars, setCars] = useState([]);
  const location = useLocation(); // Get the current location
  const { id } = useParams();
  const [price, setPrice] = useState("");

  // Function to fetch all cars and filter features
  const fetchCars = async () => {
    try {
      const response = await getAllCars();

      // Process each car to extract the last feature
      const filteredCars = response.data.map(car => {
        // Access the last features object directly
        const lastFeature = car.features?.features; // Access the nested features object

        // Return a new car object with the relevant feature information
        return {
          ...car,
          currentFeatures: lastFeature ? {
            exteriorColor: lastFeature.exteriorColor,
            interiorColor: lastFeature.interiorColor,
            wheels: lastFeature.wheels,
            tinted: lastFeature.tinted,
          } : {},
        };
      });

      setCars(filteredCars);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [location]);

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
      <div className='card-container'>
        {cars.map(car => (
          <div key={car.id} className='card'>
            <h2>{car.name}</h2>
            <p>Price: ${car.price}</p>
            {car.currentFeatures && (
              <p>
                Last Feature: 
                Exterior Color: {car.currentFeatures.exteriorColor || 'N/A'}, 
                Interior Color: {car.currentFeatures.interiorColor || 'N/A'}, 
                Wheels: {car.currentFeatures.wheels || 'N/A'}, 
                Tinted: {car.currentFeatures.tinted || 'N/A'}
              </p>
            )}
            <Link to={`/cars/${car.id}`}>Details</Link>
            <Link to={`/cars/edit/${car.id}`}>Edit</Link>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCar;
