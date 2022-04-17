import { copyObject } from '../../shared/utils';
import { ADD_PRODUCT_DATA, DELETE_PRODUCT, SET_LOADED_PRODUCT, UPDATE_PRODUCT_BODY, UPDATE_PRODUCT_TITLE } from '../actions/actionsTypes';

const initialState = {
  name: 'Изделия',
  items: [],
}

export default function productDataReducer(state = initialState, action) {
  switch(action.type) {
    case SET_LOADED_PRODUCT:
      return action.payload;
    case ADD_PRODUCT_DATA:
      return addNewProduct(state, action.payload);
    case UPDATE_PRODUCT_TITLE:
      return updateProductTitle(state, action.payload);
    case UPDATE_PRODUCT_BODY:
      return updateProductBody(state, action.payload);
    case DELETE_PRODUCT:
      return deleteProduct(state, action.payload);
    default:
      return state;
  }
}

function addNewProduct(state, {itemId, itemName}) {
  const newItems = state.items.concat();
  newItems.push({id: itemId, title: itemName, type: 'product', body: { name: itemName, drawing: '', routeId: '', componentsId: {}, productsId: {}, description: '' }});
  return {...state, items: newItems};
}

function updateProductTitle(state, {itemId, newTitle}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    newState.items[idx].title = newTitle;
  }

  return newState;
}

function updateProductBody(state, {itemId, newBody}) {
  const newState = copyObject(state);
  const idx = newState.items.findIndex(item => item.id === itemId);

  if(idx !== -1) {
    newState.items[idx].body = newBody;
  }

  return newState;
}

function deleteProduct(state, {itemId}) {
  const newState = copyObject(state);
  const newItems = newState.items.filter(item => item.id !== itemId);       
  newState.items = newItems;
  
  return newState;
}
