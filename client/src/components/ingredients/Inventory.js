import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from 'react-redux';
import { setHero } from '../../actions/hero';
import { getFood } from '../../actions/food';
import { getFoodByName, deleteIngredient } from '../../actions/food';
import { Grid } from '@mui/material';

const PREFIX = 'Inventory';

const classes = {
  root: `${PREFIX}-root`,
  list: `${PREFIX}-list`,
  noneFound: `${PREFIX}-noneFound`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`&.${classes.root}`]: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
    backgroundColor: theme.palette.background.paper,
  },

  [`& .${classes.list}`]: {
    marginTop: theme.spacing(2),
  },

  [`& .${classes.noneFound}`]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

const Inventory = ({
  setHero,
  getFood,
  getFoodByName,
  deleteIngredient,
  food,
}) => {
  const [query, setQuery] = useState({ ingredient: '', category: '' });

  useEffect(() => {
    getFood();
    setHero({
      title: 'Inventory',
      primButton: {
        link: '/add-ingredient',
        name: 'Add new ingredients',
      },
      secButton: {
        link: '/',
        name: 'Taco Recipes',
      },
    });
  }, [getFood, setHero]);

  const handleChange = e => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    getFoodByName(query);
  };

  return (
    <StyledContainer className={classes.root} maxWidth='sm'>
      <Paper elevation={1}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            spacing={3}
            className={classes.query}
          >
            <Grid item>
              <TextField
                id='ingredient'
                label='Ingredient'
                placeholder='Ingredient'
                name='ingredient'
                variant='standard'
                value={query.ingredient}
                onChange={e => handleChange(e)}
                helperText='Search for ingredients'
              />
            </Grid>
            <Grid item>
              <TextField
                id='cngredient'
                label='Category'
                placeholder='Category'
                name='category'
                variant='standard'
                value={query.category}
                onChange={e => handleChange(e)}
                helperText='filter by category'
              />
            </Grid>
            <Grid item>
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
        {food.food && food.food.length > 0 ? (
          <List dense className={classes.list}>
            {food.food.map((ingredient, index) => (
              <div key={index}>
                <Divider />
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge='end'
                      onClick={() => deleteIngredient(ingredient)}
                      aria-label='delete'
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={ingredient.name}
                    secondary={
                      ingredient.category.indexOf('') === -1
                        ? ingredient.category.toString()
                        : '** not categorized ** '
                    }
                  />
                </ListItem>
              </div>
            ))}
          </List>
        ) : (
          <Container className={classes.noneFound} maxWidth='md'>
            <Typography align='center' variant='h4' component='h3'>
              No ingredients found ...
            </Typography>
          </Container>
        )}
      </Paper>
    </StyledContainer>
  );
};

Inventory.propTypes = {
  setHero: PropTypes.func.isRequired,
  getFood: PropTypes.func.isRequired,
  getFoodByName: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  food: state.food,
});

export default connect(mapStateToProps, {
  setHero,
  getFood,
  getFoodByName,
  deleteIngredient,
})(Inventory);
