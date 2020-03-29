import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import RecipeItem from './RecipeItem';
import { getRecipes } from '../../actions/recipe';
import { setHero } from '../../actions/hero';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

const Recipes = ({ setHero, getRecipes, recipe: { recipes, loading } }) => {
  useEffect(() => {
    getRecipes();
    setHero({
      title: 'Taco Builder',
      primButton: {
        link: '/add-recipe',
        name: 'Add new taco recipe'
      },
      secButton: {
        link: '/inventory',
        name: 'Inventory'
      }
    });
  }, [getRecipes, setHero]);
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth='md'>
      {loading ? (
        <Typography align='center' variant='h4' component='h3'>
          Loading...
        </Typography>
      ) : (
        <Grid container spacing={3} alignItems='stretch'>
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe, index) => {
              return <RecipeItem key={index} recipe={recipe} />;
            })
          ) : (
            <Container maxWidth='md'>
              <Typography align='center' variant='h4' component='h3'>
                No Recipes found ...
              </Typography>
            </Container>
          )}
        </Grid>
      )}
    </Container>
  );
};

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(mapStateToProps, { setHero, getRecipes })(Recipes);
