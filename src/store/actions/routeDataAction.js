import { ADD_ROUTE_DATA, DELETE_ROUTE, UPDATE_ROUTE_BODY, UPDATE_ROUTE_TITLE } from './actionsTypes';

export function addRouteData({itemId, itemName}) {
  return {type: ADD_ROUTE_DATA, payload: {itemId, itemName}};
}

export function updateRouteTitle({itemId, newTitle}) {
  return {type: UPDATE_ROUTE_TITLE, payload: {itemId, newTitle}};
}

export function updateRouteBody({itemId, newBody}) {
  return {type: UPDATE_ROUTE_BODY, payload: {itemId, newBody}};
}

export function deleteRoute({itemId}) {
  return {type: DELETE_ROUTE, payload: {itemId}};
}
