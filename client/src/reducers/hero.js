import { SET_HERO } from '../actions/types';

const initialState = {
  title: '',
  primButton: {},
  secButton: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_HERO:
      return payload;
    default:
      return state;
  }
}
