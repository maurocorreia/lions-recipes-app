export const USER_LOGIN = 'USER_LOGIN';
export const GET_BY_FILTER_HEADER = 'GET_BY_FILTER_HEADER';
export const FOOD_INGREDIENTS = 'FOOD_INGREDIENTS';

export const userEmail = (payload) => ({ type: USER_LOGIN, payload });
export const saveListRecipes = (payload) => ({ type: GET_BY_FILTER_HEADER, payload });
export const foodIngredients = (payload) => ({ type: FOOD_INGREDIENTS, payload });
