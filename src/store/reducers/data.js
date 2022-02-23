import { ADD_ITEM, CHANGE_BODY, CHANGE_LABEL } from "../actions/actionsTypes";


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
    items: [],
  }
}

export default function dataReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ITEM:
      return addItem(state, action.payload);
    case CHANGE_LABEL:
      return changeLabel(state, action.payload);
    case CHANGE_BODY:
      return changeBody(state, action.payload);
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

function changeBody(state, {itemId, newBody, packType}) {
  const newItems = state[packType].items.map(item=>{
    if(item.id === itemId) return {...item, body: newBody};
    return item;
  });
  return {...state, [packType]: {...state[packType], items: newItems}};
}
