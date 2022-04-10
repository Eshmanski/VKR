import { copyObject } from '../../shared/utils';
import { ADD_ROUTE_DATA, DELETE_ROUTE, UPDATE_ROUTE_BODY, UPDATE_ROUTE_TITLE } from '../actions/actionsTypes';


const initialState = {
  name: 'Маршруты',
  items: [
    {id: 'route-999', title: 'reoute_1', type: 'route', body: {
      name: 'reoute',
      workshopNodes: [],
      lines: [],
    }}
  ]
}

export default function routeDataReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ROUTE_DATA:
      return addNewRoute(state, action.payload);
    case UPDATE_ROUTE_TITLE:
      return updateRouteTitle(state, action.payload);
    case UPDATE_ROUTE_BODY:
      return updateRouteBody(state, action.payload);
    case DELETE_ROUTE:
      return deleteRoute(state, action.payload);
    default:
      return state;
  }
}

function addNewRoute(state, {itemId, itemName}) {
  const newItems = state.items.concat();
  newItems.push({id: itemId, title: itemName, body: { name: itemName, workshopNodes: [], lines: []}});
  return {...state, items: newItems};
}

function updateRouteTitle(state, {itemId, newTitle}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    newState.items[idx].title = newTitle;
  }

  return newState;
}

function updateRouteBody(state, {itemId, newBody}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    newState.items[idx].body = newBody;
  }

  return newState;
}

function deleteRoute(state, {itemId}) {
  const newState = copyObject(state);
  const newItems = newState.items.filter(item => item.id !== itemId);

  newState.items = newItems;

  return newState;
}
