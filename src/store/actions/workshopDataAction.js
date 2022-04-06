import { ADD_WORKSHOP_DATA, DELETE_WORKSHOP, UPDATE_WORKSHOP_BODY, UPDATE_WORKSHOP_TITLE } from './actionsTypes';

export function addWorkshopData({itemId, itemName}) {
  return {type: ADD_WORKSHOP_DATA, payload: {itemId, itemName}};
}

export function updateWorkshopTitle({itemId, newTitle}) {
  return {type: UPDATE_WORKSHOP_TITLE, payload: {itemId, newTitle}};
}

export function updateWorkshopBody({itemId, newBody: {name: inputName, description: inputDescription}}) {
  return {type: UPDATE_WORKSHOP_BODY, payload: {itemId, newBody: {name: inputName, description: inputDescription}}};
}

export function deleteWorkshop({itemId}) {
  return {type: DELETE_WORKSHOP, payload: {itemId}};
}
