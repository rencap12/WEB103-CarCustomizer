// import React from 'react';
// import '../App.css';
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { updateCarFeatures, getFeatureOptions, updateCar, getCar, deleteCar } from '../services/CarsAPI'; // Add deleteCar import

// const EditCar = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [car, setCar] = useState(null);
//   const [exteriorColors, setExteriorColors] = useState([]);
//   const [interiorColors, setInteriorColors] = useState([]);
//   const [wheels, setWheels] = useState([]);
//   const [tints, setTints] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState({});
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Fetch feature options from the server
//   const fetchFeatureOptions = async () => {
//     try {
//       const featureData = await getFeatureOptions();
//       console.log('FEATURE DATA', featureData);
      
//       // Set feature options based on the response from the server
//       setExteriorColors(featureData.exteriorColors || []);
//       setInteriorColors(featureData.interiorColors || []);
//       setWheels(featureData.wheels || []);
//       setTints(featureData.tints || []);

//     } catch (error) {
//       console.error('Failed to fetch feature options:', error);
//     }
//   };

// //   const calculateTotalPrice = (features) => {
// //     const price = Object.values(features).reduce((total, feature) => total + (feature ? Number(feature.price) : 0), 0);
// //     setTotalPrice(price);
// // };


//   // Fetch car details on component mount
//   useEffect(() => {
//     const fetchCarData = async () => {
//       try {
//         const carResponse = await getCar(id);
//         console.log('CHECK WHERE PRICE',carResponse.data[0]);
//         console.log(carResponse.data[0].features, carResponse.data[0].name, carResponse.data[0].price);
//         setCar(carResponse.data[0]);
//         setTotalPrice(Number(carResponse.data[0].price));

//         // console.log(carResponse.data[0].price, totalPrice);
//         setSelectedFeatures(carResponse.data[0].features || {});  // Set current features
      
//         // const basePrice = Number(carResponse.data[0].price); // Ensure base price is a number
//         // const totalPrice = Object.values(selectedFeatures).reduce((total, feature) => {
//         //   const featurePrice = feature.price; // Assuming feature is an object with a price property
//         //   return total + (Number(featurePrice) || 0); // Safely add feature price
//         // }, basePrice);

//         // console.log(carResponse.data[0].price, totalPrice); // Should show correct total pric

      
      
//       } catch (error) {
//         console.error('Failed to fetch car:', error);
//       }

//     };

//     fetchCarData();
//     fetchFeatureOptions();
//   }, [id]);

//   // Handle feature change when the user selects a new option
//   const handleFeatureChange = (featureType, value) => {
//     setSelectedFeatures({
//       ...selectedFeatures,
//       [featureType]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateCarFeatures(id, { ...car, features: selectedFeatures, totalPrice });
//       alert('Car updated successfully!');
//     } catch (error) {
//       console.error('Failed to update car:', error);
//     }
//   };

//   // Handle car deletion
//   const handleDelete = async () => {
//     try {
//       await deleteCar(id);
//       alert('Car deleted successfully!');
//       navigate('/cars'); // Redirect to cars list page after deletion
//     } catch (error) {
//       console.error('Failed to delete car:', error);
//     }
//   };

//   if (!car) {
//     return <p>Loading car data...</p>;
//   }

//   console.log('SELECTED', selectedFeatures);

//   return (
//     <div className="edit-car-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
//       {/* Left side: Form for editing features */}
//       <div className="edit-car-form">
//       <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
//         <h2>Edit Car: {car.name}</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <h3>Select Exterior Color</h3>
//             {exteriorColors.map((color) => (
//               <div key={color.id}>
//                 <label>
//                   <input 
//                     type="radio" 
//                     value={color.name || color.color_name} 
//                     checked={selectedFeatures.exteriorColor === (color.name || color.color_name)}
//                     onChange={() => handleFeatureChange('exteriorColor', color.name || color.color_name)} 
//                   />
//                   {color.name || color.color_name || 'Unnamed Color'} - ${color.price}
//                 </label>
//               </div>
//             ))}
//           </div>

//           <div>
//             <h3>Select Interior Color</h3>
//             {interiorColors.map((color) => (
//               <div key={color.id}>
//                 <label>
//                   <input 
//                     type="radio" 
//                     value={color.name || color.color_name} 
//                     checked={selectedFeatures.interiorColor === (color.name || color.color_name)}
//                     onChange={() => handleFeatureChange('interiorColor', color.name || color.color_name)} 
//                   />
//                   {color.name || color.color_name || 'Unnamed Color'} - ${color.price}
//                 </label>
//               </div>
//             ))}
//           </div>

//           <div>
//             <h3>Select Wheels</h3>
//             {wheels.map((wheel) => (
//               <div key={wheel.id}>
//                 <label>
//                   <input 
//                     type="radio" 
//                     value={wheel.name || wheel.wheel_type} 
//                     checked={selectedFeatures.wheels === (wheel.name || wheel.wheel_type)}
//                     onChange={() => handleFeatureChange('wheels', wheel.name || wheel.wheel_type)} 
//                   />
//                   {wheel.name || wheel.wheel_type || 'Unnamed Wheel'} - ${wheel.price}
//                 </label>
//               </div>
//             ))}
//           </div>

//           <div>
//             <h3>Select Tint</h3>
//             {tints.map((tint) => (
//               <div key={tint.id}>
//                 <label>
//                   <input 
//                     type="radio" 
//                     value={tint.name || tint.option_name} 
//                     checked={selectedFeatures.tinted === (tint.name || tint.option_name)}
//                     onChange={() => handleFeatureChange('tinted', tint.name || tint.option_name)} 
//                   />
//                   {tint.name || tint.option_name || 'Unnamed Tint'} - ${tint.price}
//                 </label>
//               </div>
//             ))}
//           </div>

//           <button type="submit">Update Features</button>
//         </form>

//         {/* Add a delete button */}
//         <button onClick={handleDelete} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
//           Delete Car
//         </button>
//       </div>

//       {/* Right side: Display current car features */}
//       <div className="current-car-features">
//         <h3>Current Features</h3>
//         <p><strong>Exterior Color:</strong> {selectedFeatures.exteriorColor || 'Not Selected'}</p>
//         <p><strong>Interior Color:</strong> {selectedFeatures.interiorColor || 'Not Selected'}</p>
//         <p><strong>Wheels:</strong> {selectedFeatures.wheels || 'Not Selected'}</p>
//         <p><strong>Tint:</strong> {selectedFeatures.tinted || 'Not Selected'}</p>
//       </div>
//     </div>
//   );
// };

// export default EditCar;

import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCarFeatures, getFeatureOptions, updateCar, getCar, deleteCar } from '../services/CarsAPI';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [exteriorColors, setExteriorColors] = useState([]);
  const [interiorColors, setInteriorColors] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [tints, setTints] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

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

    } catch (error) {
      console.error('Failed to fetch feature options:', error);
    }
  };

  // Fetch car details on component mount
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carResponse = await getCar(id);
        console.log('CHECK WHERE PRICE', carResponse.data[0]);
        const fetchedCar = carResponse.data[0];

        setCar(fetchedCar);
        setTotalPrice(Number(fetchedCar.price)); // Initialize total price

        // Set current features and update total price with feature prices
        const currentFeatures = fetchedCar.features || {};
        setSelectedFeatures(currentFeatures); 
        
        // Calculate total price based on current features
        let initialTotalPrice = Number(fetchedCar.price);
        if (currentFeatures.exteriorColor) {
          const exteriorColor = exteriorColors.find(color => color.color_name === currentFeatures.exteriorColor);
          initialTotalPrice += exteriorColor ? Number(exteriorColor.price) : 0;
        }
        if (currentFeatures.interiorColor) {
          const interiorColor = interiorColors.find(color => color.color_name === currentFeatures.interiorColor);
          initialTotalPrice += interiorColor ? Number(interiorColor.price) : 0;
        }
        if (currentFeatures.wheels) {
          const wheel = wheels.find(wheel => wheel.wheel_type === currentFeatures.wheels);
          initialTotalPrice += wheel ? Number(wheel.price) : 0;
        }
        if (currentFeatures.tinted) {
          const tint = tints.find(tint => tint.option_name === currentFeatures.tinted);
          initialTotalPrice += tint ? Number(tint.price) : 0;
        }

        setTotalPrice(initialTotalPrice); // Set total price with features

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
    calculateTotalPrice({
      ...selectedFeatures,
      [featureType]: value,
    });
  };

  // Calculate total price based on selected features
  const calculateTotalPrice = (features) => {
    let price = Number(car.price); // Start with base price
    if (features.exteriorColor) {
      const exteriorColor = exteriorColors.find(color => color.color_name === features.exteriorColor);
      price += exteriorColor ? Number(exteriorColor.price) : 0;
    }
    if (features.interiorColor) {
      const interiorColor = interiorColors.find(color => color.color_name === features.interiorColor);
      price += interiorColor ? Number(interiorColor.price) : 0;
    }
    if (features.wheels) {
      const wheel = wheels.find(wheel => wheel.wheel_type === features.wheels);
      price += wheel ? Number(wheel.price) : 0;
    }
    if (features.tinted) {
      const tint = tints.find(tint => tint.option_name === features.tinted);
      price += tint ? Number(tint.price) : 0;
    }
    setTotalPrice(price);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCarFeatures(id, { features: selectedFeatures });
      alert('Car updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  // Handle car deletion
  const handleDelete = async () => {
    try {
      await deleteCar(id);
      alert('Car deleted successfully!');
      navigate('/'); // Redirect to cars list page after deletion
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
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <h2>Edit Car: {car.name}</h2>
        <form onSubmit={handleSubmit}>
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
                  {color.color_name} - ${color.price}
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
                    value={color.color_name} 
                    checked={selectedFeatures.interiorColor === color.color_name}
                    onChange={() => handleFeatureChange('interiorColor', color.color_name)} 
                  />
                  {color.color_name} - ${color.price}
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
                    value={wheel.wheel_type} 
                    checked={selectedFeatures.wheels === wheel.wheel_type}
                    onChange={() => handleFeatureChange('wheels', wheel.wheel_type)} 
                  />
                  {wheel.wheel_type} - ${wheel.price}
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
                    value={tint.option_name} 
                    checked={selectedFeatures.tinted === tint.option_name}
                    onChange={() => handleFeatureChange('tinted', tint.option_name)} 
                  />
                  {tint.option_name} - ${tint.price}
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
