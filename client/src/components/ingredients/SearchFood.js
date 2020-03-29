import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { getFood } from '../../actions/food';
import { selectFood } from '../../actions/selected';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto'
  },
  paper: {
    width: 210,
    height: 230,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

const not = (a, b) => {
  return a.filter(x => !b.some(y => x._id === y._id));
};

const intersection = (a, b) => {
  return a.filter(x => b.some(y => x._id === y._id));
};

const SearchFood = ({ selectFood, food: { food }, selected }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const left = food ? not(food, selected) : [];
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, selected);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    selectFood(selected.concat(leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    selectFood(not(selected, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    selectFood([]);
  };

  const customList = items => (
    <Paper variant='outlined' className={classes.paper}>
      <List dense component='div' role='list'>
        {items &&
          items.map(food => {
            const labelId = `transfer-list-item-${food.name}-label`;

            return (
              <ListItem
                key={food._id}
                role='listitem'
                button
                onClick={handleToggle(food)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(food) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={food._id}
                  primary={food.name}
                  secondary={food.category.toString()}
                />
              </ListItem>
            );
          })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            variant='outlined'
            size='small'
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            &gt;
          </Button>
          <Button
            variant='outlined'
            size='small'
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
          >
            &lt;
          </Button>
          <Button
            variant='outlined'
            size='small'
            className={classes.button}
            onClick={handleAllLeft}
            disabled={selected ? selected.length === 0 : false}
            aria-label='move all left'
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(selected)}</Grid>
    </Grid>
  );
};

SearchFood.propTypes = {
  getFood: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  food: state.food,
  selected: state.selected
});

export default connect(mapStateToProps, { getFood, selectFood })(SearchFood);
