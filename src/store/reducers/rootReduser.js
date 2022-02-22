import { combineReducers } from "redux";
import dataReducer from './data';
import stateProjectReducer from "./stateProject";

export default combineReducers({data: dataReducer, stateProject: stateProjectReducer});