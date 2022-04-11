import { ADD_COMPONENT_DATA, DELETE_COMPONENT, UPDATE_COMPONENT_BODY, UPDATE_COMPONENT_TITLE } from './actionsTypes';
import { fetchEnd, fetchStart, setChosenItem } from './stateProjectActions';

export function addComponentData({_, itemName}) {
  return async (dispatch) => {
    dispatch(fetchStart());

    const res = await fetch('https://vkr-mai-9d34d-default-rtdb.europe-west1.firebasedatabase.app/project01/componentData/items.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: itemName, body: { name: itemName, drawing: '', routeId: '', description: '' }})
    });
    const data = await res.json();

    console.log(data);
    dispatch({type: ADD_COMPONENT_DATA, payload: {itemId: data.name, itemName}});

    dispatch(setChosenItem({itemId: data.name, packType: 'componentData'}));
    
    dispatch(fetchEnd());

    
  }
}

export function updateComponentTitle({itemId, newTitle}) {
  return {type: UPDATE_COMPONENT_TITLE, payload: {itemId, newTitle}};
}

export function updateComponentBody({itemId, newBody}) {
  return {type: UPDATE_COMPONENT_BODY, payload: {itemId, newBody}};
}

export function deleteComponent({itemId}) {
  return {type: DELETE_COMPONENT, payload: {itemId}};
}
