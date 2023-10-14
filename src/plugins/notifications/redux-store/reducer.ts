import {
  PUSH_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "./types";

const initialState = {
  items : [],
}

const reducer = (state = initialState, action: {type: string, payload: any}) => {

  switch (action.type) {
    case PUSH_NOTIFICATION:
      return {
        ...state,
        isOpen: true,
        items: [
          ...state.items,
          {msg: action.payload.element, type: action.payload.type},
        ],
      }
    case REMOVE_NOTIFICATION:
      let items = [
        ...state.items.slice(0, action.payload.index),
        ...state.items.slice(++action.payload.index)
      ];
      return {
        ...state,
        items,
      }
    default: return state
  }

}

export default reducer
