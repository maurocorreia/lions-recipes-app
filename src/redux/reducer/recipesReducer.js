import { GET_RECIPES,
  SAVE_FAVORITE,
  REMOVE_FAVORITE,
  START_RECIPE,
  FINISH_RECIPE } from '../actions';

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
    return { ...state, favoriteRecipes: removeFavorite };
  }
  case FINISH_RECIPE: {
    const addedDoneRecipes = [...state.doneRecipes, payload];
    localStorage.setItem('doneRecipes', JSON.stringify(addedDoneRecipes));
    return {
      ...state,
      doneRecipes: addedDoneRecipes,
    };
  }
  case START_RECIPE: {
    const { inProgressRecipes } = state;
    const addedRecipeInProgress = {
      ...inProgressRecipes,
      [payload.type]:
      { [payload.idRecipes]: [...inProgressRecipes[type].idRecipes, payload.ingredient] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(addedRecipeInProgress));
    return {
      ...state,
      inProgressRecipes: addedRecipeInProgress,
    };
  }
  default:
    return state;
  }
};

export default recipesReducer;
