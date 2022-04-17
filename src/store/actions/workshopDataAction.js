import { ADD_WORKSHOP_DATA, DELETE_WORKSHOP, SET_LOADED_WORKSHOP, UPDATE_WORKSHOP_BODY, UPDATE_WORKSHOP_TITLE } from './actionsTypes';
import { clearChosenItem, fetchEnd, fetchError, fetchStart, setChosenItem } from './stateProjectActions';

const url = 'https://vkr-mai-9d34d-default-rtdb.europe-west1.firebasedatabase.app/project01/workshopData';

export function setLoadedWorkshop(workshopState) {
  return {type: SET_LOADED_WORKSHOP, payload: workshopState};
}

export function addWorkshopData({_, itemName}) {
  return async (dispatch) => {
    dispatch(fetchStart());

    try {
      const res = await fetch(`${url}/items.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: itemName, type: 'workshop', body: { name: itemName, description: '' }})
      });
      const data = await res.json();

      dispatch({type: ADD_WORKSHOP_DATA, payload: {itemId: data.name, itemName}});

      dispatch(setChosenItem({itemId: data.name, packType: 'workshopData'}));

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function updateWorkshopTitle({itemId, newTitle}) {
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
      
      dispatch({type: UPDATE_WORKSHOP_TITLE, payload: {itemId, newTitle: data.title}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function updateWorkshopBody({itemId, newBody}) {
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
      
      dispatch({type: UPDATE_WORKSHOP_BODY, payload: {itemId, newBody: data.body}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function deleteWorkshop({itemId}) {
  return async (dispatch) => {
    dispatch(fetchStart);

    try {
      await fetch(`${url}/items/${itemId}.json`, {
        method: 'DELETE',
      });

      dispatch(clearChosenItem());

      dispatch({type: DELETE_WORKSHOP, payload: {itemId}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}
