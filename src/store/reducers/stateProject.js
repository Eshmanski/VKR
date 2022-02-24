import { SET_CHOSEN_ITEM, TOGGLE_PACK } from "../actions/actionsTypes";

const initialState = {
  chosenPacks: ['route'],
  chosenItemId: 'route-999',
  chosenType: 'route',
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
