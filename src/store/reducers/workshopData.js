import { copyObject } from '../../shared/utils';
import { ADD_WORKSHOP_DATA, UPDATE_WORKSHOP_TITLE, UPDATE_WORKSHOP_BODY, DELETE_WORKSHOP, SET_LOADED_WORKSHOP } from '../actions/actionsTypes';

const initialState = {
  name: 'Цеха',
  items: [],
}

export default function workshopDataReducer(state = initialState, action) {
  switch(action.type) {
    case SET_LOADED_WORKSHOP:
      return action.payload;
    case ADD_WORKSHOP_DATA:
      return addNewWorkshop(state, action.payload);
    case UPDATE_WORKSHOP_TITLE:
      return updateWorkshopTitle(state, action.payload);
    case UPDATE_WORKSHOP_BODY:
      return updateWorkshopBody(state, action.payload);
    case DELETE_WORKSHOP:
      return deleteWorkshop(state, action.payload);
    default:
      return state;
  }
}

function addNewWorkshop(state, {itemId, itemName}) {
  const newItems = state.items.concat();
  newItems.push({id: itemId, title: itemName, body: { name: itemName, description: '' }});
  return {...state, items: newItems};
}

function updateWorkshopTitle(state, {itemId, newTitle}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    newState.items[idx].title = newTitle;
  }

  return newState;
}

function updateWorkshopBody(state, {itemId, newBody}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1)
    newState.items[idx].body = newBody;

  return newState;
}

function deleteWorkshop(state, {itemId}) {
  const newState = copyObject(state);
  const newItems = newState.items.filter(item => item.id !== itemId);

  newState.items = newItems;

  return newState;
}
