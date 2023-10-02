import axios from 'axios';
import { setSnackbar } from './snackbar';
import {
  GET_FOOD,
  GET_FOOD_ERROR,
  LOADING_FOOD,
  ADD_INGREDIENT,
  ADD_FOOD_ERROR,
  DELETE_INGREDIENT,
  DELETE_FOOD_ERROR,
} from './types';

// Get inventory
export const getFood = () => async dispatch => {
  try {
    dispatch({
      type: LOADING_FOOD,
    });
    const res = await axios.get('/api/ingredient');
    dispatch({
      type: GET_FOOD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FOOD_ERROR,
      payload: err,
    });
  }
};

// Get food query strings
export const getFoodByName = query => async dispatch => {
  try {
    dispatch({
      type: LOADING_FOOD,
    });
    const res = await axios.get(
      `/api/ingredient?ingredient=${query.ingredient}&category=${query.category}`
    );
    dispatch({
      type: GET_FOOD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_FOOD_ERROR,
      payload: err,
    });
  }
};

// Add ingredient
export const addIngredient = (ingredient, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/ingredient', ingredient, config);
    dispatch({
      type: ADD_INGREDIENT,
      payload: res.data,
    });
    history.push('/inventory');
    dispatch(setSnackbar('This Ingredient has been added'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(setSnackbar(errors.map(e => e.msg).toString()));
    }
    dispatch({
      type: ADD_FOOD_ERROR,
      payload: err,
    });
  }
};

// Delete ingredient
export const deleteIngredient = ingredient => async dispatch => {
  const id = ingredient._id;
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/ingredient/${id}`);
      dispatch({ type: DELETE_INGREDIENT });
      const res = await axios.get('/api/ingredient');
      dispatch({
        type: GET_FOOD,
        payload: res.data,
      });
      dispatch(setSnackbar('This ingredient has been permanently deleted'));
    } catch (err) {
      const error = err.response.data.msg;
      if (error) {
        dispatch(setSnackbar(error));
      }
      dispatch({
        type: DELETE_FOOD_ERROR,
        payload: err,
      });
    }
  }
};
