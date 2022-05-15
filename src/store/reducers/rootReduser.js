import { combineReducers } from "redux";
import stateProjectReducer from "./stateProject";


export default combineReducers({
  stateProject: stateProjectReducer, 
});
