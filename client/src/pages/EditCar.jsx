import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCarFeatures, getFeatureOptions, updateCar, getCar, deleteCar } from '../services/CarsAPI'; // Add deleteCar import

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [exteriorColors, setExteriorColors] = useState([]);
  const [interiorColors, setInteriorColors] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [tints, setTints] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});

  // Fetch feature options from the server
  const fetchFeatureOptions = async () => {
    try {
      const featureData = await getFeatureOptions();
      console.log('FEATURE DATA', featureData);
      
      // Set feature options based on the response from the server
      setExteriorColors(featureData.exteriorColors || []);
      setInteriorColors(featureData.interiorColors || []);
      setWheels(featureData.wheels || []);
      setTints(featureData.tints || []);

      console.log(wheels, tints);
    } catch (error) {
      console.error('Failed to fetch feature options:', error);
    }
  };

  // Fetch car details on component mount
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carResponse = await getCar(id);
        console.log(carResponse.data[0].features, carResponse.data[0].name, carResponse.data[0].price);
        setCar(carResponse.data[0]);
        setSelectedFeatures(carResponse.data[0].features || {});  // Set current features
      } catch (error) {
        console.error('Failed to fetch car:', error);
      }
    };

    fetchCarData();
    fetchFeatureOptions();
  }, [id]);

  // Handle feature change when the user selects a new option
  const handleFeatureChange = (featureType, value) => {
    setSelectedFeatures({
      ...selectedFeatures,
      [featureType]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCarFeatures(id, { ...car, features: selectedFeatures });
      alert('Car updated successfully!');
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  // Handle car deletion
  const handleDelete = async () => {
    try {
      await deleteCar(id);
      alert('Car deleted successfully!');
      navigate('/cars'); // Redirect to cars list page after deletion
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  };

  if (!car) {
    return <p>Loading car data...</p>;
  }

  console.log('SELECTED', selectedFeatures);

  return (
    <div className="edit-car-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Left side: Form for editing features */}
      <div className="edit-car-form">
        <h2>Edit Car: {car.name}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Select Exterior Color</h3>
            {exteriorColors.map((color) => (
              <div key={color.id}>
                <label>
                  <input 
                    type="radio" 
                    value={color.name || color.color_name} 
                    checked={selectedFeatures.exteriorColor === (color.name || color.color_name)}
                    onChange={() => handleFeatureChange('exteriorColor', color.name || color.color_name)} 
                  />
                  {color.name || color.color_name || 'Unnamed Color'}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h3>Select Interior Color</h3>
            {interiorColors.map((color) => (
              <div key={color.id}>
                <label>
                  <input 
                    type="radio" 
                    value={color.name || color.color_name} 
                    checked={selectedFeatures.interiorColor === (color.name || color.color_name)}
                    onChange={() => handleFeatureChange('interiorColor', color.name || color.color_name)} 
                  />
                  {color.name || color.color_name || 'Unnamed Color'}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h3>Select Wheels</h3>
            {wheels.map((wheel) => (
              <div key={wheel.id}>
                <label>
                  <input 
                    type="radio" 
                    value={wheel.name || wheel.wheel_type} 
                    checked={selectedFeatures.wheels === (wheel.name || wheel.wheel_type)}
                    onChange={() => handleFeatureChange('wheels', wheel.name || wheel.wheel_type)} 
                  />
                  {wheel.name || wheel.wheel_type || 'Unnamed Wheel'}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h3>Select Tint</h3>
            {tints.map((tint) => (
              <div key={tint.id}>
                <label>
                  <input 
                    type="radio" 
                    value={tint.name || tint.option_name} 
                    checked={selectedFeatures.tinted === (tint.name || tint.option_name)}
                    onChange={() => handleFeatureChange('tinted', tint.name || tint.option_name)} 
                  />
                  {tint.name || tint.option_name || 'Unnamed Tint'}
                </label>
              </div>
            ))}
          </div>

          <button type="submit">Update Features</button>
        </form>

        {/* Add a delete button */}
        <button onClick={handleDelete} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
          Delete Car
        </button>
      </div>

      {/* Right side: Display current car features */}
      <div className="current-car-features">
        <h3>Current Features</h3>
        <p><strong>Exterior Color:</strong> {selectedFeatures.exteriorColor || 'Not Selected'}</p>
        <p><strong>Interior Color:</strong> {selectedFeatures.interiorColor || 'Not Selected'}</p>
        <p><strong>Wheels:</strong> {selectedFeatures.wheels || 'Not Selected'}</p>
        <p><strong>Tint:</strong> {selectedFeatures.tinted || 'Not Selected'}</p>
      </div>
    </div>
  );
};

export default EditCar;
