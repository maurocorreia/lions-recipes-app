import { combineReducers } from 'redux';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';
import foodIngredientsReducer from './foodIngredientsReducer';

const rootReducers = combineReducers({
  userReducer, recipesReducer, foodIngredientsReducer,
});
export default rootReducers;
