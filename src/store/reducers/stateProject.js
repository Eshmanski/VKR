import { copyObject } from '../../shared/utils';
import { CLEAR_CHOSEN_ITEM, FETCH_END, FETCH_START, SET_BODY_CHANGING, SET_CHOSEN_ITEM, TOGGLE_PACK } from "../actions/actionsTypes";

const initialState = {
  chosenPacks: ['routeData'],
  chosenItemId: 'route-999',
  chosenType: 'routeData',
  isBodyChanging: false,
  isShowSaveAlert: false,
  saveBody: null,
  fetching: false,
}

export default function stateProjectReducer(state = initialState, action) {
  switch(action.type) {
    case SET_CHOSEN_ITEM:
      return setChosenItem(state, action.payload);
    case TOGGLE_PACK:
      return togglePack(state, action.payload);
    case CLEAR_CHOSEN_ITEM:
      return clearChosenItem(state);
    case SET_BODY_CHANGING:
      return setBodyChanging(state, action.payload);
    case FETCH_START:
      return {...state, fetching: true};
    case FETCH_END:
      return {...state, fetching: false};
    default:
      return state;
  }
}

function setChosenItem(state, {itemId, packType}) {
  if(state.chosenPacks.includes(packType)) 
    return {...state, chosenItemId: itemId, chosenType: packType};
  else 
    return  { ...state, chosenPacks: [...state.chosenPacks, packType], chosenItemId: itemId, chosenType: packType };
}
function togglePack(state, {packType}) {
  if(state.chosenPacks.includes(packType))
    return { ...state, chosenPacks: state.chosenPacks.filter(i => i !== packType) };
  else 
    return { ...state, chosenPacks: [...state.chosenPacks, packType] };
}

function clearChosenItem(state) {
  const newState = copyObject(state);
  newState.chosenItemId = '';
  newState.chosenType = '';

  return newState;
}

function setBodyChanging(state, {isChanging}) {
  return { ...state, isBodyChanging: isChanging };
}
