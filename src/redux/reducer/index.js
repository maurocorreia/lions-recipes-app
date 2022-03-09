import { combineReducers } from 'redux';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';

const rootReducers = combineReducers({ userReducer, recipesReducer });
export default rootReducers;
