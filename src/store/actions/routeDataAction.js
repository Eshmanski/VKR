import { ADD_ROUTE_DATA, CREATE_WORKSHOP_NODE, CREATE_WORKSHOP_NODE_LINK, DELETE_ROUTE, DELETE_WORKSHOP_NODE, DELETE_WORKSHOP_NODE_LINK, UPDATE_ROUTE_TITLE, UPDATE_WORKSHOP_NODE_POSITION } from './actionsTypes';

export function addRouteData({itemId, itemName}) {
  return {type: ADD_ROUTE_DATA, payload: {itemId, itemName}};
}

export function updateRouteTitle({itemId, newTitle}) {
  return {type: UPDATE_ROUTE_TITLE, payload: {itemId, newTitle}};
}

export function createWorkshopNode({itemId, workshopNode}) {
  return {type: CREATE_WORKSHOP_NODE, payload: {itemId, workshopNode}};
}

export function updateWorkshopNodePosition({itemId, workshopNodeId, position}) {
  return {type: UPDATE_WORKSHOP_NODE_POSITION, payload: {itemId, workshopNodeId, position}};
}

export function createWorkshopNodeLine({itemId, line}) {
  return {type: CREATE_WORKSHOP_NODE_LINK, payload: {itemId, line}};
}

export function deleteWorkshopNode({itemId, workshopId}) {
  return {type: DELETE_WORKSHOP_NODE, payload: {itemId, workshopId}};
}

export function deleteWorkshopNodeLine({itemId, lineId}) {
  return {type: DELETE_WORKSHOP_NODE_LINK, payload: {itemId, lineId}};
}

export function deleteRoute({itemId}) {
  return {type: DELETE_ROUTE, payload: {itemId}};
}
