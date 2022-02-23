import {ADD_ITEM, CHANGE_BODY, CHANGE_LABEL} from './actionsTypes';

export function addItem({itemId, itemName, packType}) {
  return {type: ADD_ITEM, payload: {itemId, itemName, packType}};
}

export function changeLabel({itemId, newLabel, packType}) {
  return {type: CHANGE_LABEL, payload: {itemId, newLabel, packType}};
}

export function changeBody({itemId, newBody, packType}) {
  return {type: CHANGE_BODY, payload: {itemId, newBody, packType}};
}
