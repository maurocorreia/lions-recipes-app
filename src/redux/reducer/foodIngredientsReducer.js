const INITIAL_STATE = {
  foodIngredients: [],
};

const foodIngredientsReducer = (state = INITIAL_STATE, action) => {
  const objectFoodIngredients = {
    FOOD_INGREDIENTS: { ...state, foodIngredients: action.payload },
  };
  return objectFoodIngredients[action.type] || state;
};

export default foodIngredientsReducer;
