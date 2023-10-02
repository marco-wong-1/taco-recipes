import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { connect } from 'react-redux';

import SearchFood from '../ingredients/SearchFood';
import { setHero } from '../../actions/hero';
import { getFood } from '../../actions/food';
import { getFoodByName } from '../../actions/food';
import { addRecipe } from '../../actions/recipe';
import { withRouter } from 'react-router-dom';

const PREFIX = 'AddRecipe';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  addButton: `${PREFIX}-addButton`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
  },

  [`& .${classes.paper}`]: {
    padding: theme.spacing(4),
  },

  [`& .${classes.addButton}`]: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const AddRecipe = ({
  setHero,
  addRecipe,
  getFood,
  getFoodByName,
  selected,
  history,
}) => {
  const [query, setQuery] = useState({ ingredient: '', category: '' });
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    image: '',
    desc: '',
    labels: '',
    calories: '',
  });

  useEffect(() => {
    getFood();
    setHero({
      title: 'Building a new Taco',
      secButton: {
        link: '/',
        name: 'Taco Recipes',
      },
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
      }),
    };
    addRecipe(sendRecipe, history);
  };

  const submitSearch = e => {
    e.preventDefault();
    getFoodByName(query);
  };

  return (
    <StyledContainer className={classes.root} maxWidth='md'>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='name'
              name='name'
              label='Recipe name'
              variant='standard'
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
              variant='standard'
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
              variant='standard'
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
              variant='standard'
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
              variant='standard'
              value={recipe.labels}
              onChange={e => recipeChange(e)}
              fullWidth
              helperText='Please comma seperate the labels'
            />
          </Grid>
        </Grid>
        <form onSubmit={submitSearch}>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            spacing={3}
          >
            <Grid item xs={5}>
              <TextField
                id='ingredient'
                name='ingredient'
                label='Ingredient'
                variant='standard'
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
                variant='standard'
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
    </StyledContainer>
  );
};

AddRecipe.propTypes = {
  setHero: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  getFood: PropTypes.func.isRequired,
  getFoodByName: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  selected: state.selected,
});

export default connect(mapStateToProps, {
  setHero,
  addRecipe,
  getFood,
  getFoodByName,
})(withRouter(AddRecipe));
