import {
  GET_RECIPES,
  RECIPE_ERROR,
  ADD_RECIPE,
  LOADING_RECIPE,
  RECIPE_DELETED
} from '../actions/types';

const initialState = {
  recipes: null,
  loading: true,
  addSuccess: false,
  error: {}
};

export default function recipe(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_RECIPE:
      return {
        ...state,
        loading: true
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        addSuccess: false,
        loading: false
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [payload, ...state.recipes],
        addSuccess: true,
        loading: false
      };
    case RECIPE_ERROR:
      return {
        ...state,
        error: payload,
        addSuccess: false,
        loading: false
      };
    case RECIPE_DELETED:
      return {
        ...state
      };
    default:
      return state;
  }
}
