import {ADD_ITEM, ADD_LINE_ROAD, ADD_WORKSHOP_ROAD, CHANGE_BODY_WORKSHOP, CHANGE_LABEL, UPDATE_WORKSHOP_ROAD} from './actionsTypes';

export function addItem({itemId, itemName, packType}) {
  return {type: ADD_ITEM, payload: {itemId, itemName, packType}};
}

export function changeLabel({itemId, newLabel, packType}) {
  return {type: CHANGE_LABEL, payload: {itemId, newLabel, packType}};
}

export function changeBodyWorkshop({itemId, newBody, packType}) {
  return {type: CHANGE_BODY_WORKSHOP, payload: {itemId, newBody, packType}};
}

export function addWorkshopRoad({itemId, workshop, packType}) {
  return {type: ADD_WORKSHOP_ROAD, payload: {itemId, workshop, packType}};
}

export function updateWorkshopRoad({itemId, workshop, packType}) {
  return {type: UPDATE_WORKSHOP_ROAD, payload: {itemId, workshop, packType}};
}

export function addLineRoad({itemId, line}) {
  return {type: ADD_LINE_ROAD, payload: {itemId, line}};
}
