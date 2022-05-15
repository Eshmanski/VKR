import {FETCH_START, FETCH_END, FETCH_ERROR, SET_ENTERPRISE_MODELS, TOGGLE_PACK, SET_MODEL_ID, SET_BODY, SWITCH_SEARCH, CLOSE_SEARCH, CHANGE_BODY, SET_IS_BODY_CHANGING, CLEAR_BODY} from './actionsTypes';


export function fetchProject() {
  return async dispatch => {
    dispatch(fetchStart());

    try {
      const res = await fetch('http://127.0.0.1:8080/api/models');
      const data = await res.json();

      dispatch(setEnterpriseModels(data));
    } catch(e) {
      dispatch(fetchError(e));
    }

    dispatch(fetchEnd());
  }
}

export function fetchBody(id, type, bodyId) {
  return async dispatch => {
    dispatch(fetchStart());
    
    const apis = {
      product: 'products',
      component: 'components',
      route: 'routes',
      workshop: 'workshops'
    }
    
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/${apis[type]}/${bodyId}`);
      const data = await res.json();
      
      dispatch(setBody(data, type));
      dispatch(setChosenModel(id, type));
    } catch(e) {
      dispatch(fetchError(e));
    }
    
    dispatch(fetchEnd());
  }
}

export function createModel(type, title) {
  return async dispatch => {
    dispatch(fetchStart());
    
    try {
      const res = await fetch('http://127.0.0.1:8080/api/createModel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: 'sXUlQYd6RwkjVhmDTQ7WkgbLi5IwJtIX6JJuNxRfEjUk9uQiv4',
          content: {
            type,
            title
          }
        })
      });
      const data = await res.json();
      
      await dispatch(fetchProject());
      await dispatch(fetchBody(data.id, data.type, data.bodyId));
    } catch(e) {
      dispatch(fetchError(e));
    }
    
    dispatch(fetchEnd());
  }
}

export function changeTitle(id, title) {
  return async dispatch => {
    dispatch(fetchStart());
    
    try {
      const res = await fetch('http://127.0.0.1:8080/api/updateTitle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: 'sXUlQYd6RwkjVhmDTQ7WkgbLi5IwJtIX6JJuNxRfEjUk9uQiv4',
          content: {
            id,
            title
          }
        })
      });
      const data = await res.json();
      
      dispatch(setEnterpriseModels(data))
    } catch(e) {
      dispatch(fetchError(e));
    }
    
    dispatch(fetchEnd());
  }
}

export function saveBody() {
  return async (dispatch, getState) => {
    dispatch(fetchStart());
    
    const apis = {
      product: 'updateProduct',
      component: 'updateComponent',
      route: 'updateRoute',
      workshop: 'updateWorkshop'
    }

    const body = getState().stateProject.chosenBody;
    const type = getState().stateProject.bodyType;

    try {
      const res = await fetch(`http://127.0.0.1:8080/api/${apis[type]}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: 'sXUlQYd6RwkjVhmDTQ7WkgbLi5IwJtIX6JJuNxRfEjUk9uQiv4',
          content: body
        })
      });

      const data = await res.json();
      
      dispatch(setBody(data, type));
      dispatch(setIsBodyChanging(false));
    } catch(e) {
      dispatch(fetchError(e));
    }
    
    dispatch(fetchEnd());
  }
}

export function returnBody() {
  return async (dispatch, getState) => {
    const id = getState().stateProject.chosenModelId;
    const type = getState().stateProject.bodyType;
    const { id: bodyId } = getState().stateProject.chosenBody;

    await dispatch(fetchBody(id, type, bodyId));
    dispatch(setIsBodyChanging(false));
  }
}

export function deleteBody() {
  return async (dispatch, getState) => {
    dispatch(fetchStart());

    const type = getState().stateProject.bodyType;
    const { id } = getState().stateProject.chosenBody;

    try {
      const res = await fetch(`http://127.0.0.1:8080/api/deleteModel`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: 'sXUlQYd6RwkjVhmDTQ7WkgbLi5IwJtIX6JJuNxRfEjUk9uQiv4',
          content: {
            id,
            type
          }
        })
      });

      const data = await res.json();
      
      dispatch(setEnterpriseModels(data));
      dispatch(clearBody());
    } catch(e) {
      dispatch(fetchError(e));
    }
    
    dispatch(fetchEnd());
  }
}



export function setEnterpriseModels(enterpriseModels) {
  return {type: SET_ENTERPRISE_MODELS, payload: { enterpriseModels }};
}

export function setChosenModel(id, type) {
  return {type: SET_MODEL_ID, payload: { id, type }}
}

export function togglePack(type) {
  return {type: TOGGLE_PACK, payload: { type }}
}

export function setBody(body, type) {
  return { type: SET_BODY, payload: { body, type }}
}

export function changeBody(body) {
  return { type: CHANGE_BODY, payload: { body }};
}

export function setIsBodyChanging(flag) {
  return { type: SET_IS_BODY_CHANGING, payload: { flag }}
}

export function switchSearch() {
  return { type: SWITCH_SEARCH };
}

export function closeSearch() {
  return { type: CLOSE_SEARCH };
}

export function clearBody() {
  return { type: CLEAR_BODY };
}

export function fetchStart() {
  return {type: FETCH_START};
}

export function fetchEnd() {
  return {type: FETCH_END};
}

export function fetchError(e) {
  return {type: FETCH_ERROR, payload: { error: e }};
}
