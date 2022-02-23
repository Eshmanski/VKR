import { SET_CHOSEN_ITEM, TOGGLE_PACK } from "./actionsTypes";

export function setChosenItem({itemId, packType}) {
  return {type: SET_CHOSEN_ITEM, payload: {itemId, packType}};
}

export function togglePack(packType) {
  return {type: TOGGLE_PACK, payload: {packType}};
}
