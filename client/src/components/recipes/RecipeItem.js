import React, { useState } from 'react';
// import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DefaultTacoImg from '../../icons/taco.svg';
import { deleteRecipe } from '../../actions/recipe';

const PREFIX = 'RecipeItem';

const classes = {
  root: `${PREFIX}-root`,
  img: `${PREFIX}-img`,
  dialogTitle: `${PREFIX}-dialogTitle`,
  dialogEnd: `${PREFIX}-dialogEnd`,
  delete: `${PREFIX}-delete`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
// const Root = styled('div')(({ theme }) => ({
//   [`& .${classes.root}`]: {
//     height: '100%',
//     // maxWidth: 345,
//     // minWidth: 220,
//     width: 220,
//   },

//   [`& .${classes.img}`]: {
//     height: 220,
//   },

//   [`& .${classes.dialogTitle}`]: {
//     textAlign: 'center',
//     paddingTop: theme.spacing(4),
//     paddingBottom: 0,
//   },

//   [`& .${classes.dialogEnd}`]: {
//     paddingBottom: theme.spacing(4),
//   },

//   [`& .${classes.delete}`]: {
//     marginTop: theme.spacing(2),
//     textAlign: 'center',
//     display: 'block',
//   },
// }));

const defaultTacoImg = DefaultTacoImg;

const RecipeItem = ({
  deleteRecipe,
  recipe: { _id, name, image, ingredients, desc, labels, calories },
}) => {
  image = image || defaultTacoImg;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component='img'
            alt={name}
            image={image}
            title={name}
            className={classes.img}
          />
          <CardContent>
            <Typography noWrap gutterBottom variant='h5' component='h4'>
              {name}
            </Typography>
            <Tooltip title={desc}>
              <Typography
                noWrap
                gutterBottom
                variant='body2'
                color='textSecondary'
                component='p'
              >
                {desc}
              </Typography>
            </Tooltip>
            <Typography variant='subtitle1' color='textSecondary' component='p'>
              Total Calories: {Math.floor(calories)} cal
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll='body'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title' className={classes.dialogTitle}>
          <img src={image} alt={name} width={'100%'} />
          <Typography variant='h2' component='span'>
            <br />
            {name}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogEnd}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              {ingredients.length > 0
                ? ingredients.map((ing, index) => (
                    <Typography
                      gutterBottom
                      variant='body1'
                      color='textPrimary'
                      component='span'
                      key={index}
                    >
                      - {ing.ingredient.name}
                      <br />
                    </Typography>
                  ))
                : 'No Ingredient listed for this recipe'}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                gutterBottom
                variant='body2'
                color='textSecondary'
                component='span'
              >
                Labels: {labels.toString()}
                <br />
              </Typography>
              <Typography
                gutterBottom
                variant='body2'
                color='textSecondary'
                component='span'
              >
                {desc}
                <br />
              </Typography>
              <Typography
                gutterBottom
                variant='subtitle1'
                color='textSecondary'
                component='span'
              >
                Total Calories: {Math.floor(calories)} cal
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.delete}>
                <Button
                  variant='contained'
                  color='secondary'
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteRecipe(_id)}
                >
                  Delete
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default connect(null, { deleteRecipe })(RecipeItem);
