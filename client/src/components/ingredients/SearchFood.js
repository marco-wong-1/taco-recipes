import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { connect } from 'react-redux';
import { getFood } from '../../actions/food';
import { selectFood } from '../../actions/selected';

const PREFIX = 'SearchFood';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  button: `${PREFIX}-button`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    margin: 'auto'
  },

  [`& .${classes.paper}`]: {
    width: 210,
    height: 230,
    overflow: 'auto'
  },

  [`& .${classes.button}`]: {
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
    <StyledGrid
      container
      spacing={2}
      justifyContent='center'
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
    </StyledGrid>
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
