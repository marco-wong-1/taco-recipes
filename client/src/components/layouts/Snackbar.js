import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { removeSnackbar } from '../../actions/snackbar';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export const SnackbarAlert = ({
  snackbars: { snackbars, open },
  removeSnackbar
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    removeSnackbar();
  };

  const classes = useStyles();
  return (
    snackbars !== null && (
      <Snackbar
        key={snackbars.msg ? snackbars.msg : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbars.msg ? snackbars.msg : undefined}
        action={
          <Fragment>
            <IconButton
              aria-label='close'
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Fragment>
        }
      />
    )
  );
};

Snackbar.protoTypes = {
  snackbars: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  snackbars: state.snackbar
});

export default connect(mapStateToProps, { removeSnackbar })(SnackbarAlert);
