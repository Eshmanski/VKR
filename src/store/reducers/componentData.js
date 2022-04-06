import { copyObject } from '../../shared/utils';
import { ADD_COMPONENT_DATA, DELETE_COMPONENT, UPDATE_COMPONENT_TITLE, UPDATE_COMPONENT_BODY } from '../actions/actionsTypes';

const initialState = {
    name: 'Деталь',
    items: []
}

export default function componentDataReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_COMPONENT_DATA:
      return addNewComponent(state, action.payload);
    case UPDATE_COMPONENT_TITLE:
      return updateComponentTitle(state, action.payload);
    case UPDATE_COMPONENT_BODY:
      return updateComponentBody(state, action.payload);
    case DELETE_COMPONENT:
      return deleteComponent(state, action.payload);
    default:
      return state;
  }
}

function addNewComponent(state, {itemId, itemName}) {
  const newItems = state.items.concat();
  newItems.push({id: itemId, title: itemName, body: { name: itemName, drawing: '', routeId: '', description: '' }});
  return {...state, items: newItems};
}

function updateComponentTitle(state, {itemId, newTitle}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    newState.items[idx].title = newTitle;
  }

  return newState;
}

function updateComponentBody(state, {itemId, newBody}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    newState.items[idx].body = newBody;
  }

  return newState;
}

function deleteComponent(state, {itemId}) {
  const newState = copyObject(state);
  const newItems = newState.items.filter(item => item.id !== itemId);       
  newState.items = newItems;
  
  return newState;
}
