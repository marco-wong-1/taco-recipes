import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import RecipeItem from './RecipeItem';
import { getRecipes } from '../../actions/recipe';
import { setHero } from '../../actions/hero';

const PREFIX = 'Recipes';

const classes = {
  root: `${PREFIX}-root`
};

const StyledContainer = styled(Container)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
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

  return (
    <StyledContainer className={classes.root} maxWidth='md'>
      {loading ? (
        <Typography align='center' variant='h4' component='h3'>
          Loading...
        </Typography>
      ) : (
        <Grid container spacing={5}>
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
    </StyledContainer>
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
