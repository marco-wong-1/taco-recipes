import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import DefaultTacoImg from '../../icons/taco.svg'
import { deleteRecipe } from '../../actions/recipe';

const defaultTacoImg = DefaultTacoImg

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    maxWidth: 345
  },
  img: {
    height: 220
  },
  dialogTitle: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: 0
  },
  dialogEnd: {
    paddingBottom: theme.spacing(4)
  },
  delete: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    display: 'block'
  }
}));

const RecipeItem = ({
  deleteRecipe,
  recipe: { _id, name, image, ingredients, desc, labels, calories }
}) => {
  image = image || defaultTacoImg ;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
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
              <Typography
                variant='subtitle1'
                color='textSecondary'
                component='p'
              >
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
    </Fragment>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default connect(null, { deleteRecipe })(RecipeItem);
