import { ADD_ROUTE_DATA, DELETE_ROUTE, SET_LOADED_ROUTE, UPDATE_ROUTE_BODY, UPDATE_ROUTE_TITLE } from './actionsTypes';
import { clearChosenItem, fetchEnd, fetchError, fetchStart, setChosenItem } from './stateProjectActions';

const url = 'https://vkr-mai-9d34d-default-rtdb.europe-west1.firebasedatabase.app/project01/routeData';

export function setLoadedRoute(routeState) {
  return {type: SET_LOADED_ROUTE, payload: routeState};
}

export function addRouteData({_, itemName}) {
  return async (dispatch) => {
    dispatch(fetchStart());

    try {
      const res = await fetch(`${url}/items.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: itemName, body: { name: itemName, workshopNodes: [], lines: []}})
      });
      const data = await res.json();

      dispatch({type: ADD_ROUTE_DATA, payload: {itemId: data.name, itemName}});

      dispatch(setChosenItem({itemId: data.name, packType: 'routeData'}));

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function updateRouteTitle({itemId, newTitle}) {
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
      
      dispatch({type: UPDATE_ROUTE_TITLE, payload: {itemId, newTitle: data.title}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function updateRouteBody({itemId, newBody}) {
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

      if(data.body.workshopNodes === undefined) data.body.workshopNodes = [];
      if(data.body.lines === undefined) data.body.lines = [];
      
      dispatch({type: UPDATE_ROUTE_BODY, payload: {itemId, newBody: data.body}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}

export function deleteRoute({itemId}) {
  return async (dispatch) => {
    dispatch(fetchStart);

    try {
      await fetch(`${url}/items/${itemId}.json`, {
        method: 'DELETE',
      });

      dispatch(clearChosenItem());

      dispatch({type: DELETE_ROUTE, payload: {itemId}});

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
}
