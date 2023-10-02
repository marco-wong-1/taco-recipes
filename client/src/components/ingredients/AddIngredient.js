import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { connect } from 'react-redux';

import { setHero } from '../../actions/hero';
import { addIngredient } from '../../actions/food';
import { withRouter } from 'react-router-dom';

const PREFIX = 'AddIngredient';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  addButton: `${PREFIX}-addButton`
};

const StyledContainer = styled(Container)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6)
  },

  [`& .${classes.paper}`]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },

  [`& .${classes.addButton}`]: {
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  }
}));

const AddIngredient = ({ setHero, addIngredient, history }) => {

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
    <StyledContainer className={classes.root} maxWidth='sm'>
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
    </StyledContainer>
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
