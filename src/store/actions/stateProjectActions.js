import { copyObject, formalizeState } from "../../shared/utils";
import { CLEAR_CHOSEN_ITEM, FETCH_START, FETCH_END, SET_BODY_CHANGING, SET_CHOSEN_ITEM, TOGGLE_PACK, FETCH_ERROR, CHANGE_BODY_ITEM,  SWITCH_SEARCH_COMPONENT, CLOSE_SEARCH_COMPONENT } from "./actionsTypes";
import { deleteComponent, setLoadedComponent, updateComponentBody } from "./componentDataAction";
import { deleteProduct, setLoadedProduct, updateProductBody } from "./productDataActons";
import { deleteRoute, setLoadedRoute, updateRouteBody } from "./routeDataAction";
import { deleteWorkshop, setLoadedWorkshop, updateWorkshopBody } from "./workshopDataAction";

export function fetchProject(projectName) {
  return async dispatch => {
    dispatch(fetchStart());

    try {
      const res = await fetch('https://vkr-mai-9d34d-default-rtdb.europe-west1.firebasedatabase.app/project01.json');
      const data = await res.json();

      dispatch(setLoadedWorkshop(formalizeState(data.workshopData)));
      dispatch(setLoadedRoute(formalizeState(data.routeData)));
      dispatch(setLoadedComponent(formalizeState(data.componentData)));
      dispatch(setLoadedProduct(formalizeState(data.productData)));

      dispatch(fetchEnd());
    } catch(e) {
      dispatch(fetchError(e));
    }
  }
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

export function setChosenItem({itemId, packType}) {
  return (dispatch, getState) => {
    dispatch(clearChosenItem());
    
    const chosenItem = copyObject(getState()[packType].items.find(item => item.id === itemId));

    dispatch({type: SET_CHOSEN_ITEM, payload: {itemId, packType, chosenItem}});
  }
}

export function changeBodyItem(newBody) {
  return {type: CHANGE_BODY_ITEM, payload: {newBody}};
}

export function saveBodyItem() {
  return (dispatch, getState) => {
    const {chosenType,chosenItem} = getState().stateProject;

    switch(chosenType) {
      case 'workshopData':
        dispatch(updateWorkshopBody({itemId: chosenItem.id, newBody: chosenItem.body}));
        break;
      case 'routeData':
        dispatch(updateRouteBody({itemId: chosenItem.id, newBody: chosenItem.body}));
        break;
      case 'componentData':
        dispatch(updateComponentBody({itemId: chosenItem.id, newBody: chosenItem.body}));
        break;
      case 'productData':
        dispatch(updateProductBody({itemId: chosenItem.id, newBody: chosenItem.body}));
        break;
      default:
        break;
    }
    
    dispatch(setBodyChanging(false));
  }
}

export function returnBodyItem() {
  return (dispatch, getState) => {
    const {chosenType,chosenItem} = getState().stateProject;
    const body = copyObject(getState()[chosenType].items.find(item => item.id === chosenItem.id)).body;

    dispatch(changeBodyItem(body));
    dispatch(setBodyChanging(false));
  }
}

export function deleteChosenItem() {
  return (dispatch, getState) => {
    const {chosenType,chosenItem} = getState().stateProject;

    switch(chosenType) {
      case 'workshopData':
        dispatch(deleteWorkshop({itemId: chosenItem.id}));
        break;
      case 'routeData':
        dispatch(deleteRoute({itemId: chosenItem.id}));
        break;
      case 'componentData':
        dispatch(deleteComponent({itemId: chosenItem.id}));
        break;
      case 'productData':
        dispatch(deleteProduct({itemId: chosenItem.id}));
        break;
      default:
        break;
    }

    dispatch(setBodyChanging(false));
    dispatch(clearChosenItem());
  }
}

export function togglePack(packType) {
  return {type: TOGGLE_PACK, payload: { packType }};
}

export function clearChosenItem() {
  return {type: CLEAR_CHOSEN_ITEM};
}

export function setBodyChanging(isChanging) {
  return {type: SET_BODY_CHANGING, payload: { isChanging }};
}

export function switchSearchComponent() {
  return {type: SWITCH_SEARCH_COMPONENT}
}

export function closeSearchComponent() {
  return {type: CLOSE_SEARCH_COMPONENT};
}