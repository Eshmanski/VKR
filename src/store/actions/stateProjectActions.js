import { SET_CHOSEN_ITEM, TOGGLE_PACK } from "./actionsTypes";

export function setChosenItem(itemId, type) {
  return {type: SET_CHOSEN_ITEM, payload: {type, itemId}};
}

export function togglePack(type) {
  return {type: TOGGLE_PACK, payload: {type}};
}