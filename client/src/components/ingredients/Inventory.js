import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { setHero } from '../../actions/hero';
import { getFood } from '../../actions/food';
import { getFoodByName } from '../../actions/food';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
    backgroundColor: theme.palette.background.paper
  },
  list: {
    marginTop: theme.spacing(2)
  },
  noneFound: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6)
  }
}));

const Inventory = ({ setHero, getFood, getFoodByName, food }) => {
  const classes = useStyles();
  const [query, setQuery] = useState({ ingredient: '', category: '' });

  useEffect(() => {
    getFood();
    setHero({
      title: 'Inventory',
      primButton: {
        link: '/add-ingredient',
        name: 'Add new ingredients'
      },
      secButton: {
        link: '/',
        name: 'Taco Recipes'
      }
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
    <Container className={classes.root} maxWidth='sm'>
      <Paper elevation={1}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems='center'
            justify='center'
            spacing={3}
            className={classes.query}
          >
            <Grid item>
              <TextField
                id='ingredient'
                label='Ingredient'
                placeholder='Ingredient'
                name='ingredient'
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
                {/* {food.food.length !== index + 1 && <Divider />} */}
                <ListItem key={index}>
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
    </Container>
  );
};

Inventory.propTypes = {
  setHero: PropTypes.func.isRequired,
  getFood: PropTypes.func.isRequired,
  getFoodByName: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  food: state.food
});

export default connect(mapStateToProps, { setHero, getFood, getFoodByName })(
  Inventory
);
