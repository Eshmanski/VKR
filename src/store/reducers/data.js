import { ADD_ITEM } from "../actions/actionsTypes";

const initialState = [
  {
    typeItems: 'product',
    name: 'Изделия',
    items: [
      {id: '1', name: 'изделие_1', type: 'product'}
    ],
  },
  {
    typeItems: 'component',
    name: 'Деталь',
    items: []
  },
  {
    typeItems: 'workshop',
    name: 'Цеха',
    items: [],
  },
  {
    typeItems: 'route',
    name: 'Маршруты',
    items: [],
  }
]

export default function dataReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ITEM:
      state[action.payload.idx].items.push(action.payload.item);
      return state;
    default:
      return state;
  }
}