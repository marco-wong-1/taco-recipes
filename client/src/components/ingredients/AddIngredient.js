import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { connect } from 'react-redux';

import { setHero } from '../../actions/hero';
import { addIngredient } from '../../actions/food';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6)
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  addButton: {
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  }
}));

const AddIngredient = ({ setHero, addIngredient, history }) => {
  const classes = useStyles();
  const [ingredient, setIngredient] = useState({
    name: '',
    category: ''
  });

  useEffect(() => {
    setHero({
      title: 'Add Ingredient',
      secButton: {
        link: '/inventory',
        name: 'Inventory'
      }
    });
  }, [setHero]);

  const handleChange = e => {
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(ingredient);
    addIngredient(ingredient, history);
  };

  return (
    <Container className={classes.root} maxWidth='sm'>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='name'
              name='name'
              label='Ingredient name'
              type='search'
              value={ingredient.name}
              onChange={e => handleChange(e)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='category'
              name='category'
              label='category'
              type='search'
              value={ingredient.category}
              onChange={e => handleChange(e)}
              helperText='Please comma seperate categories'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.addButton}>
              <Button
                variant='contained'
                color='primary'
                endIcon={<AddBoxIcon />}
                onClick={() => handleSubmit()}
              >
                Add Ingredient
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

AddIngredient.propTypes = {
  setHero: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired
};

export default connect(null, {
  setHero,
  addIngredient
})(withRouter(AddIngredient));
