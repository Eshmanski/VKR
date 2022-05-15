import { SET_ENTERPRISE_MODELS, SET_MODEL_ID, TOGGLE_PACK, SET_BODY, SWITCH_SEARCH, CLOSE_SEARCH, CHANGE_BODY, SET_IS_BODY_CHANGING, FETCH_START, FETCH_ERROR, FETCH_END, CLEAR_BODY } from '../actions/actionsTypes';

const initialState = {
  enterpriseModels: [],
  chosenPack: '',
  chosenModelId: '',
  bodyType: '',
  chosenBody: {},
  isBodyChanging: false,
  isShowSaveAlert: false,
  isShowSearch: false,
  fetching: false,
  error: '',
}

export default function stateProjectReducer(state = initialState, action) {
  switch(action.type) {
    case SET_ENTERPRISE_MODELS:
      return {...state, enterpriseModels: action.payload.enterpriseModels };
    case TOGGLE_PACK:
      if (state.chosenPack === action.payload.type)
        return {...state, chosenPack: '' }
      else
         return {...state, chosenPack: action.payload.type };
    case SET_MODEL_ID:
      return { ...state, chosenPack: action.payload.type, chosenModelId: action.payload.id };
    case SET_BODY:
      return { ...state, chosenBody: action.payload.body, bodyType: action.payload.type };
    case CHANGE_BODY:
      return { ...state, chosenBody: action.payload.body };
    case SET_IS_BODY_CHANGING:
      return { ...state, isBodyChanging: action.payload.flag };
    case CLEAR_BODY:
      return { ...state, chosenModelId: '', bodyType: '', chosenBody: {}, isBodyChanging: false }
    case SWITCH_SEARCH:
      return { ...state, isShowSearch: !state.isShowSearch};
    case CLOSE_SEARCH:
      return { ...state, isShowSearch: false };
    case FETCH_START:
      return { ...state, fetching: true };
    case FETCH_END:
      return { ...state, fetching: false };
    case FETCH_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}
