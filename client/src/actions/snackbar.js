import { SET_SNACKBAR, REMOVE_SNACKBAR } from './types';

export const setSnackbar = msg => dispatch => {
  dispatch({
    type: SET_SNACKBAR,
    payload: { msg }
  });
};

export const removeSnackbar = () => dispatch => {
  dispatch({
    type: REMOVE_SNACKBAR
  });
};
