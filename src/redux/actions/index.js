export const USER_LOGIN = 'USER_LOGIN';
export const GET_RECIPES = 'GET_RECIPES';
export const SAVE_FAVORITE = 'SAVE_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const FINISH_RECIPE = 'FINISH_RECIPE';
export const START_RECIPE = 'START_RECIPE';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const userEmail = (payload) => ({ type: USER_LOGIN, payload });
export const saveListRecipes = (payload) => ({ type: GET_RECIPES, payload });
export const saveFavorite = (payload) => ({ type: SAVE_FAVORITE, payload });
export const removeFavorite = (payload) => ({ type: REMOVE_FAVORITE, payload });
export const recipeEnd = (payload) => ({ type: FINISH_RECIPE, payload });
export const startRecipe = (payload) => ({ type: START_RECIPE, payload });
export const addIngredient = (payload) => ({ type: ADD_INGREDIENT, payload });
export const removeIngredient = (payload) => ({ type: REMOVE_INGREDIENT, payload });
