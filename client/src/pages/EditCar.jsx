import React from 'react'
import '../App.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCar, updateCar, getFeatureOptions } from '../services/CarsAPI';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const [features, setFeatures] = useState({
    exteriorColors: [],
    interiorColors: [],
    wheels: [],
    tinted: []
  });

  useEffect(() => {
    const fetchCarAndOptions = async () => {
      const carData = await getCar(id);
      setCar(carData.data);

      const featureData = await getFeatureOptions();
      setFeatures(featureData);
    };
    fetchCarAndOptions();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar(id, car);
      navigate(`/cars/${id}`);
    } catch (error) {
      console.error("Failed to update car", error);
    }
  };

  return (
    <div>
      <h1>Edit Car</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          value={car.name} 
          onChange={(e) => setCar({ ...car, name: e.target.value })} 
        />

        <label>Exterior Color:</label>
        <select 
          value={car.features.exteriorColor} 
          onChange={(e) => setCar({ ...car, features: { ...car.features, exteriorColor: e.target.value } })}
        >
          {features.exteriorColors.map((color) => (
            <option key={color.id} value={color.color_name}>
              {color.color_name} (+${color.price})
            </option>
          ))}
        </select>

        <label>Interior Color:</label>
        <select 
          value={car.features.interiorColor} 
          onChange={(e) => setCar({ ...car, features: { ...car.features, interiorColor: e.target.value } })}
        >
          {features.interiorColors.map((color) => (
            <option key={color.id} value={color.color_name}>
              {color.color_name} (+${color.price})
            </option>
          ))}
        </select>

        <label>Wheels:</label>
        <select 
          value={car.features.wheels} 
          onChange={(e) => setCar({ ...car, features: { ...car.features, wheels: e.target.value } })}
        >
          {features.wheels.map((wheel) => (
            <option key={wheel.id} value={wheel.wheel_type}>
              {wheel.wheel_type} (+${wheel.price})
            </option>
          ))}
        </select>

        <label>Tinted:</label>
        <select 
          value={car.features.tinted} 
          onChange={(e) => setCar({ ...car, features: { ...car.features, tinted: e.target.value } })}
        >
          {features.tinted.map((tint) => (
            <option key={tint.id} value={tint.option_name}>
              {tint.option_name} (+${tint.price})
            </option>
          ))}
        </select>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCar;