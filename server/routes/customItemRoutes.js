import express from 'express';
import { getExteriorColors,
    getInteriorColors,
    getWheels,
    getTints,
    updateCarFeatures,
     getFeatureOptions, 
     getCustomItems,
      addCustomItem, 
      updateCustomItem, 
      deleteCustomItem,
      getCustomItemDetails 
    } from '../controllers/customItemController.js';

const router = express.Router();

// Define routes
router.get('/custom-items', getCustomItems);
router.get('/custom-items/:id', getCustomItemDetails);
router.get('/feature-options', getFeatureOptions);
router.post('/custom-items', addCustomItem);
router.put('/custom-items/:id', updateCustomItem);
router.delete('/custom-items/:id', deleteCustomItem);

// New routes for fetching feature options
router.get('/features/exterior-colors', getExteriorColors);
router.get('/features/interior-colors', getInteriorColors);
router.get('/features/wheels', getWheels);
router.get('/features/tints', getTints);

// Route to update car with selected features
router.put('/custom-items/features/:id', updateCarFeatures);

export default router;
