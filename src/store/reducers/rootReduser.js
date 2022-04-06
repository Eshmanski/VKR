import { combineReducers } from "redux";
import componentDataReducer from './componentData';
import productDataReducer from './productData';
import routeDataReducer from './routeData';
import stateProjectReducer from "./stateProject";
import workshopDataReducer from './workshopData';

export default combineReducers({
  stateProject: stateProjectReducer, 
  productData: productDataReducer, 
  componentData: componentDataReducer,
  workshopData: workshopDataReducer,
  routeData: routeDataReducer,
});
