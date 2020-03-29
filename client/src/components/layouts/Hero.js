import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  heroContent: {
    margin: 0,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  }
}));

export const Hero = ({ hero: { title, primButton, secButton } }) => {
  const classes = useStyles();
  return (
    <Container disableGutters maxWidth='false' className={classes.heroContent}>
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='textPrimary'
        gutterBottom
      >
        {title}
      </Typography>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify='center'>
          <Grid item>
            {primButton && (
              <Button
                component={Link}
                to={primButton.link}
                variant='contained'
                color='primary'
              >
                {primButton.name}
              </Button>
            )}
          </Grid>
          <Grid item>
            {secButton && (
              <Button
                component={Link}
                to={secButton.link}
                variant='outlined'
                color='primary'
              >
                {secButton.name}
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

Hero.protoTypes = {
  hero: PropTypes.object
};

const mapStateToProps = state => ({
  hero: state.hero
});

export default connect(mapStateToProps)(Hero);
