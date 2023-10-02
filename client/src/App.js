import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Hero from './components/layouts/Hero';
import Snackbar from './components/layouts/Snackbar';
import Recipes from './components/recipes/Recipes';
import AddRecipe from './components/recipes/AddRecipe';
import AddIngredient from './components/ingredients/AddIngredient';
import Inventory from './components/ingredients/Inventory';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { getRecipes } from './actions/recipe';

function App() {
  useEffect(() => {
    store.dispatch(getRecipes());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <CssBaseline />
          <Hero />
          <Snackbar />
          <Switch>
            <Route exact path='/' component={Recipes} />
            <Route exact path='/add-recipe' component={AddRecipe} />
            <Route exact path='/add-ingredient' component={AddIngredient} />
            <Route exact path='/inventory' component={Inventory} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
