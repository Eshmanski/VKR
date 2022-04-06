import { ADD_PRODUCT_DATA, DELETE_PRODUCT, UPDATE_PRODUCT_BODY, UPDATE_PRODUCT_TITLE } from './actionsTypes';

export function addProductData({itemId, itemName}) {
  return {type: ADD_PRODUCT_DATA, payload: {itemId, itemName}};
}

export function updateProductTitle({itemId, newTitle}) {
  return {type: UPDATE_PRODUCT_TITLE, payload: {itemId, newTitle}};
}

export function updateProductBody({itemId, newBody}) {
  return {type: UPDATE_PRODUCT_BODY, payload: {itemId, newBody}};
}

export function deleteProduct({itemId}) {
  return {type: DELETE_PRODUCT, payload: {itemId}};
}
