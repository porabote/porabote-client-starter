import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from "./types";

const initialState = {
  isOpen: false,
  items : [],
  activeItemKey: 0,
}

const reducer = (state = initialState, action: {type: string, payload: any}) => {

  switch (action.type) {
    case OPEN_DIALOG:
      return {...state, isOpen: true}
    case CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false,
        items: [],
        activeItemKey: 0,
      }
    default: return state
  }

}

export default reducer
