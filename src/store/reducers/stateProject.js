import { SET_CHOSEN_ITEM, TOGGLE_PACK } from "../actions/actionsTypes";

const initialState = {
  chosenPacks: ['product'],
  chosenItem: '',
}

export default function stateProjectReducer(state = initialState, action) {
  switch(action.type) {
    case SET_CHOSEN_ITEM:
      return setChosenItem(state, action.payload);
    case TOGGLE_PACK:
      return togglePack(state, action.payload);
    default:
      return state;
  }
}

function setChosenItem(state, payload) {
  if(state.chosenPacks.includes(payload.type)) 
    return {...state, chosenItem: payload.itemId};
  else 
    return  { ...state, chosenPacks: [...state.chosenPacks, payload.type], chosenItem: payload.itemId };
}
function togglePack(state, payload) {
  if(state.chosenPacks.includes(payload.type))
    return { ...state, chosenPacks: state.chosenPacks.filter(i => i !== payload.type) };
  else 
    return { ...state, chosenPacks: [...state.chosenPacks, payload.type] };
}