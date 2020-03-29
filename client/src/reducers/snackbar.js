import { SET_SNACKBAR, REMOVE_SNACKBAR } from '../actions/types';

const initialState = {
  snackbars: null,
  open: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SNACKBAR:
      return {
        ...state,
        snackbars: payload,
        open: true
      };
    case REMOVE_SNACKBAR:
      return {
        ...state,
        snackbars: [],
        open: false
      };
    default:
      return state;
  }
}
