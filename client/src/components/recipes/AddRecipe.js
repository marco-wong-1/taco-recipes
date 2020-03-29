import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { connect } from 'react-redux';

import SearchFood from '../ingredients/SearchFood';
import { setHero } from '../../actions/hero';
import { getFood } from '../../actions/food';
import { getFoodByName } from '../../actions/food';
import { addRecipe } from '../../actions/recipe';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6)
  },
  paper: {
    padding: theme.spacing(4)
  },
  addButton: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  }
}));

const AddRecipe = ({
  setHero,
  addRecipe,
  getFood,
  getFoodByName,
  selected,
  history
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState({ ingredient: '', category: '' });
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    image: '',
    desc: '',
    labels: '',
    calories: ''
  });

  useEffect(() => {
    getFood();
    setHero({
      title: 'Building a new Taco',
      secButton: {
        link: '/',
        name: 'Taco Recipes'
      }
    });
  }, [getFood, setHero]);

  const recipeChange = e => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const queryChange = e => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const sendRecipe = {
      ...recipe,
      ingredients: selected.map(i => {
        return { ingredient: i };
      })
    };
    addRecipe(sendRecipe, history);
  };

  const submitSearch = e => {
    e.preventDefault();
    getFoodByName(query);
  };

  return (
    <Container className={classes.root} maxWidth='md'>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='name'
              name='name'
              label='Recipe name'
              value={recipe.name}
              onChange={e => recipeChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='calories'
              name='calories'
              label='Calories'
              type='number'
              value={recipe.calories}
              onChange={e => recipeChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='desc'
              name='desc'
              label='Description'
              value={recipe.desc}
              onChange={e => recipeChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='image'
              name='image'
              label='Link to image'
              value={recipe.image}
              onChange={e => recipeChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='labels'
              name='labels'
              label='Labels'
              value={recipe.labels}
              onChange={e => recipeChange(e)}
              fullWidth
              helperText='Please comma seperate the labels'
            />
          </Grid>
        </Grid>
        <form onSubmit={submitSearch}>
          <Grid container alignItems='center' justify='center' spacing={3}>
            <Grid item xs={5}>
              <TextField
                id='ingredient'
                name='ingredient'
                label='Ingredient'
                placeholder='Ingredient'
                type='search'
                value={query.ingredient}
                onChange={e => queryChange(e)}
                helperText='Search for ingredients'
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id='category'
                name='category'
                label='Category'
                placeholder='Category'
                type='search'
                value={query.category}
                onChange={e => queryChange(e)}
                helperText='filter by category'
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                type='submit'
                className={classes.iconButton}
                aria-label='search'
              >
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
        <Grid container>
          <Grid item xs={12}>
            <SearchFood />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.addButton}>
              <Button
                variant='contained'
                color='primary'
                endIcon={<PostAddIcon />}
                onClick={() => handleAdd()}
              >
                Add Recipe
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

AddRecipe.propTypes = {
  setHero: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  getFood: PropTypes.func.isRequired,
  getFoodByName: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  selected: state.selected
});

export default connect(mapStateToProps, {
  setHero,
  addRecipe,
  getFood,
  getFoodByName
})(withRouter(AddRecipe));
