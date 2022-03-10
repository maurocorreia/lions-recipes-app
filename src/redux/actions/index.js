export const USER_LOGIN = 'USER_LOGIN';
export const GET_RECIPES = 'GET_RECIPES';

export const userEmail = (payload) => ({ type: USER_LOGIN, payload });
export const saveListRecipes = (payload) => ({ type: GET_RECIPES, payload });
