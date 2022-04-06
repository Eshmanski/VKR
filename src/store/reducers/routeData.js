import { copyObject } from '../../shared/utils';
import { ADD_ROUTE_DATA, CREATE_WORKSHOP_NODE, CREATE_WORKSHOP_NODE_LINK, DELETE_ROUTE, DELETE_WORKSHOP_NODE, DELETE_WORKSHOP_NODE_LINK, UPDATE_ROUTE_TITLE, UPDATE_WORKSHOP_NODE_POSITION } from '../actions/actionsTypes';


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
    case CREATE_WORKSHOP_NODE:
      return createWorkshopNode(state, action.payload);
    case UPDATE_WORKSHOP_NODE_POSITION:
      return updateWorkshopNodePosition(state, action.payload);
    case CREATE_WORKSHOP_NODE_LINK:
      return createWorkshopNodeLine(state, action.payload);
    case DELETE_WORKSHOP_NODE:
      return deleteWorkshopNode(state, action.payload);
    case DELETE_WORKSHOP_NODE_LINK:
      return deleteWorkshopNodeLine(state, action.payload);
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

function createWorkshopNode(state, {itemId, workshopNode}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    newState.items[idx].body.workshopNodes.push(workshopNode);
  }

  return newState;
}

function updateWorkshopNodePosition(state, {itemId, workshopNodeId, position}) {
  const newState = copyObject(state);
  const itemIdx = newState.items.findIndex(item => item.id === itemId);

  if(itemIdx !== -1) {
    const workshopNodeIdx = newState.items[itemIdx].body.workshopNodes.findIndex(item => item.id === workshopNodeId);

    if(workshopNodeIdx !== -1) {
      newState.items[itemIdx].body.workshopNodes[workshopNodeIdx].position = position;
    }
  }

  return newState;
}

function createWorkshopNodeLine(state, {itemId, line}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    newState.items[idx].body.lines.push(line);
  }

  return newState;
}

function deleteWorkshopNode(state, {itemId, workshopId}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);
  const newWorshopNodes = newState.items[idx].body.workshopNodes.filter(workshopNode => workshopId !== workshopNode.id);
  const newLines = newState.items[idx].body.lines.filter(line => workshopId !== line.start && workshopId !== line.end);

  newState.items[idx] = {...newState.items[idx], body: {...newState.items[idx].body, workshopNodes: newWorshopNodes, lines: newLines}};

  return newState;
}

function deleteWorkshopNodeLine(state, {itemId, lineId}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);
  const newLines = newState.items[idx].body.lines.filter(line => lineId !== line.id);

  newState.items[idx] = {...newState.items[idx], body: {...newState.items[idx].body, lines: newLines}};

  return newState;
}

function deleteRoute(state, {itemId}) {
  const newState = copyObject(state);
  const newItems = newState.items.filter(item => item.id !== itemId);

  newState.items = newItems;

  return newState;
}
