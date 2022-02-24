import { copyObject } from '../../shared/utils';
import { ADD_ITEM, ADD_LINE_ROAD, ADD_WORKSHOP_ROAD, CHANGE_BODY_WORKSHOP, CHANGE_LABEL, UPDATE_WORKSHOP_ROAD } from "../actions/actionsTypes";


const initialState = {
  'product': {
    name: 'Изделия',
    items: [],
  },
  'component': {
    name: 'Деталь',
    items: []
  },
  'workshop': {
    name: 'Цеха',
    items: [],
  },
  'route': {
    name: 'Маршруты',
    items: [
      {id: 'route-999', label: 'reoute_1', type: 'route', body: {
        name: 'reoute'
      }}
    ],
  }
}

export default function dataReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ITEM:
      return addItem(state, action.payload);
    case CHANGE_LABEL:
      return changeLabel(state, action.payload);
    case CHANGE_BODY_WORKSHOP:
      return changeBodyWorkshop(state, action.payload);
    case ADD_WORKSHOP_ROAD:
      return addWorkshopRoad(state, action.payload);
    case UPDATE_WORKSHOP_ROAD:
      return updateWorkshopRoad(state, action.payload);
    case ADD_LINE_ROAD:
      return addLineRoad(state, action.payload);
    default:
      return state;
  }
}

function addItem(state, {itemId, itemName, packType}) {
  const newItems = state[packType].items.concat();
  newItems.push({id: itemId, label: itemName, type: packType, body: { name: itemName }});
  return {...state, [packType]: {...state[packType], items: newItems}};
}

function changeLabel(state, {itemId, newLabel, packType}) {
  const newItems = state[packType].items.map(item=>{
    if(item.id === itemId) return {...item, label: newLabel};
    return item;
  });
  return {...state, [packType]: {...state[packType], items: newItems}};
}

function changeBodyWorkshop(state, {itemId, newBody, packType}) {
  const newItems = state[packType].items.map(item=>{
    if(item.id === itemId) return {...item, body: newBody};
    return item;
  });
  return {...state, [packType]: {...state[packType], items: newItems}};
}

function addWorkshopRoad(state, {itemId, workshop, packType}) {
  const newState = copyObject(state);
  const idx = newState[packType].items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    if(!newState[packType].items[idx].body.workshops)
      newState[packType].items[idx].body.workshops = [];
    newState[packType].items[idx].body.workshops.push(workshop)
  } 

  return newState;
}

function updateWorkshopRoad(state, {itemId, workshop, packType}) {
  const newState = copyObject(state);
  const idx = newState[packType].items.findIndex(item => item.id === itemId);
  if(idx !== -1) {
    const workshopId = newState[packType].items[idx].body.workshops.findIndex(item => item.id === workshop.id);
    if(workshopId !== -1) {
      newState[packType].items[idx].body.workshops[workshopId] = workshop;
    }
  } 

  return newState;
}

function addLineRoad(state, {itemId, line}) {
  const newState = copyObject(state);

  const idx = newState['route'].items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    if(!newState['route'].items[idx].body.lines)
      newState['route'].items[idx].body.lines = [];
    newState['route'].items[idx].body.lines.push(line)
  } 

  return newState;
}
