const INITIAL_STATE = {
  recipes: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  const objectRecipesReducer = {
    GET_RECIPES: { ...state, recipes: action.payload },
  };
  return objectRecipesReducer[action.type] || state;
};

export default recipesReducer;
