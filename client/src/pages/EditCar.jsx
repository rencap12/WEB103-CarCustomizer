// import React from 'react'
// import '../App.css'
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getFeatureOptions, updateCar, getCar, getExteriorColors, getInteriorColors, getWheels, getTints } from '../services/CarsAPI';

// const EditCar = () => {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const [exteriorColors, setExteriorColors] = useState([]);
//   const [interiorColors, setInteriorColors] = useState([]);
//   const [wheels, setWheels] = useState([]);
//   const [tints, setTints] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState({}); // To store selected features

//     // Fetch feature options from the server
//     const fetchFeatureOptions = async () => {
//       try {
//         const featureData = await getFeatureOptions(); // Get all feature options
        
//         // Make sure to check if the data has the necessary keys before accessing them
//         const exteriorData = featureData.exteriorColors || [];
//         const interiorData = featureData.interiorColors || [];
//         const wheelsData = featureData.wheels || [];
//         const tintsData = featureData.tints || [];
  
//         setExteriorColors(exteriorData);
//         setInteriorColors(interiorData);
//         setWheels(wheelsData);
//         setTints(tintsData);
//       } catch (error) {
//         console.error('Failed to fetch feature options:', error);
//       }
//     };
    
//   useEffect(() => {

//     const fetchCarDetails = async () => {
//       const carData = await getCar(id);
//       setCar(carData.data);
//     };
    
//     const fetchCarData = async () => {
//       try {
//         const carResponse = await getCar(id);
//         setCar(carResponse.data);
//         setSelectedFeatures(carResponse.data.features || {});  // Set current features
//       } catch (error) {
//         console.error('Failed to fetch car:', error);
//       }
//     };

//     fetchCarData();
//     fetchCarDetails();
//     fetchFeatureOptions();
//   }, [id]);

//   const handleFeatureChange = (featureType, value) => {
//     setSelectedFeatures({
//       ...selectedFeatures,
//       [featureType]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateCar(id, { ...car, features: selectedFeatures });
//       alert('Car updated successfully!');
//     } catch (error) {
//       console.error('Failed to update car:', error);
//     }
//   };

//   if (!car) {
//     return <p>Loading car data...</p>;
//   }

//   if (!car) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Edit Car: {car.name}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h3>Select Exterior Color</h3>
//           {exteriorColors.map((color) => (
//             <div key={color.id}>
//               <label>
//                 <input 
//                   type="radio" 
//                   value={color.name} 
//                   onChange={() => handleFeatureChange('exteriorColor', color.name)} 
//                 />
//                 {color.name}
//               </label>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3>Select Interior Color</h3>
//           {interiorColors.map((color) => (
//             <div key={color.id}>
//               <label>
//                 <input 
//                   type="radio" 
//                   value={color.name} 
//                   onChange={() => handleFeatureChange('interiorColor', color.name)} 
//                 />
//                 {color.name}
//               </label>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3>Select Wheels</h3>
//           {wheels.map((wheel) => (
//             <div key={wheel.id}>
//               <label>
//                 <input 
//                   type="radio" 
//                   value={wheel.name} 
//                   onChange={() => handleFeatureChange('wheels', wheel.name)} 
//                 />
//                 {wheel.name}
//               </label>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3>Select Tint</h3>
//           {tints.map((tint) => (
//             <div key={tint.id}>
//               <label>
//                 <input 
//                   type="radio" 
//                   value={tint.name} 
//                   onChange={() => handleFeatureChange('tint', tint.name)} 
//                 />
//                 {tint.name}
//               </label>
//             </div>
//           ))}
//         </div>
//         <button type="submit">Update Features</button>
//       </form>
//     </div>
//   );
// };

// export default EditCar;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFeatureOptions, updateCar, getCar } from '../services/CarsAPI'; // Import necessary API methods

const EditCar = () => {
  const { id } = useParams(); // Get car ID from URL
  const navigate = useNavigate(); // For navigation after update
  const [car, setCar] = useState(null);
  const [exteriorColors, setExteriorColors] = useState([]);
  const [interiorColors, setInteriorColors] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [tints, setTints] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({
    exteriorColor: '',
    interiorColor: '',
    wheels: '',
    tint: '',
  });

  // Fetch car details and feature options
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch car details
        const carResponse = await getCar(id);
        setCar(carResponse.data);
        
        // Set selected features from the car data
        setSelectedFeatures({
          exteriorColor: carResponse.data.exterior_color || '',
          interiorColor: carResponse.data.interior_color || '',
          wheels: carResponse.data.wheels || '',
          tint: carResponse.data.tint || '',
        });

        // Fetch feature options
        const featureData = await getFeatureOptions();
        setExteriorColors(featureData.exteriorColors || []);
        setInteriorColors(featureData.interiorColors || []);
        setWheels(featureData.wheels || []);
        setTints(featureData.tints || []);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Run the function when the component mounts
  }, [id]);

  // Handle feature selection change
  const handleFeatureChange = (featureType, value) => {
    setSelectedFeatures((prevSelectedFeatures) => ({
      ...prevSelectedFeatures,
      [featureType]: value,
    }));
  };

  // Handle form submission to update the car
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar(id, { ...car, features: selectedFeatures });
      alert('Car updated successfully!');
      navigate(`/cars/${id}`); // Redirect to the car details page
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  // Show loading message if car data is not available yet
  if (!car) {
    return <p>Loading car data...</p>;
  }

  return (
    <div>
      <h2>Edit Car: {car.name}</h2>
      <form onSubmit={handleSubmit}>
        {/* Exterior Color Options */}
        <div>
          <h3>Select Exterior Color</h3>
          {exteriorColors.map((color) => (
            <div key={color.id}>
              <label>
                <input
                  type="radio"
                  value={color.color_name}
                  checked={selectedFeatures.exteriorColor === color.color_name}
                  onChange={() => handleFeatureChange('exteriorColor', color.color_name)}
                />
                {color.color_name}
              </label>
            </div>
          ))}
        </div>

        {/* Interior Color Options */}
        <div>
          <h3>Select Interior Color</h3>
          {interiorColors.map((color) => (
            <div key={color.id}>
              <label>
                <input
                  type="radio"
                  value={color.color_name}
                  checked={selectedFeatures.interiorColor === color.color_name}
                  onChange={() => handleFeatureChange('interiorColor', color.color_name)}
                />
                {color.color_name}
              </label>
            </div>
          ))}
        </div>

        {/* Wheels Options */}
        <div>
          <h3>Select Wheels</h3>
          {wheels.map((wheel) => (
            <div key={wheel.id}>
              <label>
                <input
                  type="radio"
                  value={wheel.wheel_type}
                  checked={selectedFeatures.wheels === wheel.wheel_type}
                  onChange={() => handleFeatureChange('wheels', wheel.wheel_type)}
                />
                {wheel.wheel_type}
              </label>
            </div>
          ))}
        </div>

        {/* Tint Options */}
        <div>
          <h3>Select Tint</h3>
          {tints.map((tint) => (
            <div key={tint.id}>
              <label>
                <input
                  type="radio"
                  value={tint.option_name}
                  checked={selectedFeatures.tint === tint.option_name}
                  onChange={() => handleFeatureChange('tint', tint.option_name)}
                />
                {tint.option_name}
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Update Features</button>
      </form>
    </div>
  );
};

export default EditCar;
