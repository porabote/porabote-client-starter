import {
  OPEN_MODAL,
  CLOSE_MODAL,
  PUSH_MODAL_ITEM,
  REMOVE_MODAL_ITEM,
  SET_ACTIVE_ITEM,
} from "./types";

const initialState = {
  isOpen: false,
  items : [],
  activeItemKey: 0,
}

const reducer = (state = initialState, action: {type: string, payload: any}) => {

  switch (action.type) {
    case PUSH_MODAL_ITEM:
      return {...state,
        isOpen: true,
        items: [
          ...state.items,
          {
            content: action.payload.content,
            key: Math.random(),
          }
        ],
        activeItemKey: state.items.length,
      }
    case OPEN_MODAL:
      return {...state, isOpen: true}
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        items: [],
        activeItemKey: 0,
      }
    case SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItemKey: action.payload.tabKey,
      }
    case REMOVE_MODAL_ITEM:

      let items = [
        ...state.items.slice(0, action.payload.tabKey),
        ...state.items.slice(++action.payload.tabKey)
      ];

      return {
        ...state,
        items,
        isOpen: items.length ? true : false,
        activeItemKey: items.length > 0 ? items.length - 1 : 0,
      }
    default: return state
  }

}

export default reducer
