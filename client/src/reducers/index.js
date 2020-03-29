import { combineReducers } from 'redux';
import snackbar from './snackbar';
import recipe from './recipe';
import selected from './selected';
import food from './food';
import hero from './hero';

export default combineReducers({
  snackbar,
  recipe,
  selected,
  food,
  hero
});
