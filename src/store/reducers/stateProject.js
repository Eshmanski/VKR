import { copyObject } from '../../shared/utils';
import { CHANGE_BODY_ITEM, CLEAR_CHOSEN_ITEM, FETCH_END, FETCH_ERROR, FETCH_START, SET_BODY_CHANGING, SET_CHOSEN_ITEM, TOGGLE_PACK } from "../actions/actionsTypes";

const initialState = {
  chosenPacks: [''],
  chosenItemId: '',
  chosenType: '',
  isBodyChanging: false,
  isShowSaveAlert: false,
  saveBody: null,
  fetching: false,
  chosenItem: {},
  error: '',
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
    case CHANGE_BODY_ITEM: 
      return changeBodyItem(state, action.payload);
    case FETCH_START:
      return {...state, fetching: true};
    case FETCH_END:
      return {...state, fetching: false};
    case FETCH_ERROR:
      return {...state, fatching: false, error: action.payload.error};
    default:
      return state;
  }
}

function setChosenItem(state, {itemId, packType, chosenItem}) {
  if(state.chosenPacks.includes(packType)) 
    return {...state, chosenItemId: itemId, chosenType: packType, chosenItem};
  else 
    return  { ...state, chosenPacks: [...state.chosenPacks, packType], chosenItemId: itemId, chosenType: packType, chosenItem};
}

function changeBodyItem(state, {newBody}) {
  return {...state, chosenItem: {...state.chosenItem, body: newBody}};
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
  newState.chosenItem = {};

  return newState;
}

function setBodyChanging(state, {isChanging}) {
  return { ...state, isBodyChanging: isChanging };
}
