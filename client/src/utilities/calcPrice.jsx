export const calculatePrice = (features) => {
    return features.reduce((total, feature) => total + feature.price, 0);
  };
  