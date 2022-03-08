import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from '../reducer';

const store = createStore(rootReducers, composeWithDevTools());

export default store;
