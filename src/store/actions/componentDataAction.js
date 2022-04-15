import { ADD_COMPONENT_DATA, DELETE_COMPONENT, SET_LOADED_COMPONENT, UPDATE_COMPONENT_BODY, UPDATE_COMPONENT_TITLE } from './actionsTypes';
import { clearChosenItem, fetchEnd, fetchError, fetchStart, setChosenItem } from './stateProjectActions';

const url = 'https://vkr-mai-9d34d-default-rtdb.europe-west1.firebasedatabase.app/project01/componentData';

export function setLoadedComponent(componentState) {
  return {type: SET_LOADED_COMPONENT, payload: componentState};
}

export function addComponentData({_, itemName}) {
  return async (dispatch) => {
    dispatch(fetchStart());

    try {
      const res = await fetch(`${url}/items.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: itemName, body: { name: itemName, drawing: '', routeId: '', description: '' }})
      });
      const data = await res.json();

      dispatch({type: ADD_COMPONENT_DATA, payload: {itemId: data.name, itemName}});

      dispatch(setChosenItem({itemId: data.name, packType: 'componentData'}));

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function updateComponentTitle({itemId, newTitle}) {
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
      
      dispatch({type: UPDATE_COMPONENT_TITLE, payload: {itemId, newTitle: data.title}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function updateComponentBody({itemId, newBody}) {
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

      dispatch({type: UPDATE_COMPONENT_BODY, payload: {itemId, newBody: data.body}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function deleteComponent({itemId}) {
  return async (dispatch) => {
    dispatch(fetchStart);

    try {
      await fetch(`${url}/items/${itemId}.json`, {
        method: 'DELETE',
      });

      dispatch(clearChosenItem());

      dispatch({type: DELETE_COMPONENT, payload: {itemId}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}
