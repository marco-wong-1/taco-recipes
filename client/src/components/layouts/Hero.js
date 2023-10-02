import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';

const PREFIX = 'Hero';

const classes = {
  heroContent: `${PREFIX}-heroContent`,
  heroButtons: `${PREFIX}-heroButtons`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`&.${classes.heroContent}`]: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0, 6),
  },

  [`& .${classes.heroButtons}`]: {
    marginTop: theme.spacing(4),
  },
}));

export const Hero = ({ hero: { title, primButton, secButton } }) => {
  return (
    <StyledContainer maxWidth='false' className={classes.heroContent}>
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
        <Grid container spacing={2} justifyContent='center' >
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
    </StyledContainer>
  );
};

Hero.protoTypes = {
  hero: PropTypes.object,
};

const mapStateToProps = state => ({
  hero: state.hero,
});

export default connect(mapStateToProps)(Hero);
