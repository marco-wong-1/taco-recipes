import { SELECTED_FOOD } from './types';

export const selectFood = food => dispatch => {
  dispatch({
    type: SELECTED_FOOD,
    payload: food
  });
};
