import {ADD_ITEM} from './actionsTypes';

export function addItem(idx, item) {
  return {type: ADD_ITEM, payload: {item, idx}}
}