import { SET_HERO } from './types';

export const setHero = hero => dispatch => {
  dispatch({
    type: SET_HERO,
    payload: hero
  });
};
