import { ADD_PRODUCT_DATA, DELETE_PRODUCT, SET_LOADED_PRODUCT, UPDATE_PRODUCT_BODY, UPDATE_PRODUCT_TITLE } from './actionsTypes';
import { clearChosenItem, fetchEnd, fetchError, fetchStart, setChosenItem } from './stateProjectActions';

const url = 'https://vkr-mai-9d34d-default-rtdb.europe-west1.firebasedatabase.app/project01/productData';

export function setLoadedProduct(productState) {
  return {type: SET_LOADED_PRODUCT, payload: productState};
}

export function addProductData({_, itemName}) {
  return async (dispatch) => {
    dispatch(fetchStart());

    try {
      const res = await fetch(`${url}/items.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: itemName, type: 'product', body: { name: itemName, drawing: '', routeId: '', componentsId: {}, productsId: {}, description: '' }})
      });
      const data = await res.json();

      dispatch({type: ADD_PRODUCT_DATA, payload: {itemId: data.name, itemName}});

      dispatch(setChosenItem({itemId: data.name, packType: 'productData'}));

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function updateProductTitle({itemId, newTitle}) {
  return async (dispatch) => {
    dispatch(fetchStart);

    try {
      const res = await fetch(`${url}/items/${itemId}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: newTitle})
      });
      const data = await res.json();
      
      dispatch({type: UPDATE_PRODUCT_TITLE, payload: {itemId, newTitle: data.title}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function updateProductBody({itemId, newBody}) {
  return async (dispatch) => {
    dispatch(fetchStart);

    try {
      const res = await fetch(`${url}/items/${itemId}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({body: newBody})
      });
      const data = await res.json();

      if(data.body.componentsId === undefined) data.body.componentsId = {};
      if(data.body.productsId === undefined) data.body.productsId = {};

      dispatch({type: UPDATE_PRODUCT_BODY, payload: {itemId, newBody: data.body}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function deleteProduct({itemId}) {
  return async (dispatch) => {
    dispatch(fetchStart);

    try {
      await fetch(`${url}/items/${itemId}.json`, {
        method: 'DELETE',
      });

      dispatch(clearChosenItem());

      dispatch({type: DELETE_PRODUCT, payload: {itemId}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}
