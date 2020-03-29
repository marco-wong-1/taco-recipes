import axios from 'axios';
import { setSnackbar } from './snackbar';
import {
  GET_RECIPES,
  ADD_RECIPE,
  LOADING_RECIPE,
  RECIPE_DELETED,
  RECIPE_ERROR
} from './types';

// Get recipes
export const getRecipes = () => async dispatch => {
  try {
    dispatch({
      type: LOADING_RECIPE
    });
    const res = await axios.get('/api/recipe');
    dispatch({
      type: GET_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: err
    });
  }
};

// Add recipe
export const addRecipe = (recipe, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/recipe', recipe, config);
    dispatch({
      type: ADD_RECIPE,
      payload: res.data
    });
    history.push('/');
    dispatch(setSnackbar('This recipe has been added'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(setSnackbar(errors.map(e => e.msg).toString()));
    }
    dispatch({
      type: RECIPE_ERROR,
      payload: err
    });
  }
};

// Delete recipe
export const deleteRecipe = id => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/recipe/${id}`);
      dispatch({ type: RECIPE_DELETED });
      dispatch(getRecipes());
      dispatch(setSnackbar('This recipe has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err
      });
    }
  }
};
