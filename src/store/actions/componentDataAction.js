import { ADD_COMPONENT_DATA, DELETE_COMPONENT, UPDATE_COMPONENT_BODY, UPDATE_COMPONENT_TITLE } from './actionsTypes';

export function addComponentData({itemId, itemName}) {
  return {type: ADD_COMPONENT_DATA, payload: {itemId, itemName}};
}

export function updateComponentTitle({itemId, newTitle}) {
  return {type: UPDATE_COMPONENT_TITLE, payload: {itemId, newTitle}};
}

export function updateComponentBody({itemId, newBody}) {
  return {type: UPDATE_COMPONENT_BODY, payload: {itemId, newBody}};
}

export function deleteComponent({itemId}) {
  return {type: DELETE_COMPONENT, payload: {itemId}};
}
