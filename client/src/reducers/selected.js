import { SELECTED_FOOD } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECTED_FOOD:
      return payload;
    default:
      return state;
  }
}
