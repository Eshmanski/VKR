import { CLEAR_CHOSEN_ITEM, FETCH_START, FETCH_END, SET_BODY_CHANGING, SET_CHOSEN_ITEM, TOGGLE_PACK } from "./actionsTypes";

export function fetchProject(projectName) {
  return async dispatch => {
    const res = await fetch('https://vkr-mai-9d34d-default-rtdb.europe-west1.firebasedatabase.app/project01.json');
    const data = await res.json();
    console.log(data);
  }
}

export function fetchStart() {
  return {type: FETCH_START};
}

export function fetchEnd() {
  return {type: FETCH_END};
}

export function setChosenItem({itemId, packType}) {
  return {type: SET_CHOSEN_ITEM, payload: {itemId, packType}};
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
