import { GET_RECIPES,
  SAVE_FAVORITE,
  REMOVE_FAVORITE,
  START_RECIPE,
  FINISH_RECIPE,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')) || [],
  inProgressRecipes: JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { cocktails: {}, meals: {} },
};

const recipesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_RECIPES:
    return { ...state, recipes: payload };
  case SAVE_FAVORITE: {
    const addedFavorite = [...state.favoriteRecipes, payload];
    localStorage.setItem('favoriteRecipes', JSON.stringify(addedFavorite));
    return { ...state, favoriteRecipes: addedFavorite };
  }
  case REMOVE_FAVORITE: {
    const removeFavorite = state.favoriteRecipes.filter(({ id }) => id !== payload);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    return { ...state, favoriteRecipes: [...removeFavorite] };
  }
  case FINISH_RECIPE: {
    const addedDoneRecipes = [...state.doneRecipes, payload];
    localStorage.setItem('doneRecipes', JSON.stringify(addedDoneRecipes));
    return { ...state, doneRecipes: addedDoneRecipes };
  }
  case START_RECIPE: {
    const { inProgressRecipes } = state;
    const addedRecipeInProgress = {
      ...inProgressRecipes,
      [payload.type]: { [payload.idRecipes]: [payload.ingredient] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(addedRecipeInProgress));
    return { ...state, inProgressRecipes: addedRecipeInProgress };
  }
  case ADD_INGREDIENT: {
    const { inProgressRecipes } = state;
    const addIngredient = {
      ...inProgressRecipes,
      [payload.type]: { [payload.idRecipes]:
        [...inProgressRecipes[payload.type][payload.idRecipes], payload.ingredient] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(addIngredient));
    return { ...state, inProgressRecipes: addIngredient };
  }
  case REMOVE_INGREDIENT: {
    const { inProgressRecipes } = state;
    const removeIngredient = { ...inProgressRecipes,
      [payload.type]: { [payload.idRecipes]:
        [...inProgressRecipes[payload.type][payload.idRecipes]
          .filter((ingredient) => ingredient !== payload.ingredient)] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(removeIngredient));
    return { ...state, inProgressRecipes: removeIngredient };
  }
  default:
    return state;
  }
};

export default recipesReducer;
