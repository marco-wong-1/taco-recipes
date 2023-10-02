import {
  GET_FOOD,
  GET_FOOD_ERROR,
  LOADING_FOOD,
  ADD_INGREDIENT,
  ADD_FOOD_ERROR,
  DELETE_INGREDIENT,
  DELETE_FOOD_ERROR,
} from '../actions/types';

const initialState = {
  food: null,
  loading: true,
  addSuccess: false,
  error: {},
};

export default function food(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING_FOOD:
      return {
        ...state,
        loading: true,
      };
    case GET_FOOD:
      return {
        ...state,
        food: payload,
        error: {},
        loading: false,
      };
    case GET_FOOD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        addSuccess: true,
        loading: false,
      };
    case ADD_FOOD_ERROR:
      return {
        ...state,
        error: payload,
        addSuccess: false,
        loading: false,
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
      };
    case DELETE_FOOD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
