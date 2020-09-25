import { combineReducers } from "redux";

import productsReducer from "./Products";

export default combineReducers({
  products: productsReducer
});