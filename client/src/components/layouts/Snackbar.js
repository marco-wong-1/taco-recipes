import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { removeSnackbar } from '../../actions/snackbar';

const PREFIX = 'SnackbarAlert';

const classes = {
  close: `${PREFIX}-close`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.close}`]: {
    padding: theme.spacing(0.5),
  },
}));

export const SnackbarAlert = ({
  snackbars: { snackbars, open },
  removeSnackbar,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    removeSnackbar();
  };

  return (
    snackbars !== null && (
      <Snackbar
        key={snackbars.msg ? snackbars.msg : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbars.msg ? snackbars.msg : undefined}
        action={
          <Root>
            <IconButton
              aria-label='close'
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Root>
        }
      />
    )
  );
};

Snackbar.protoTypes = {
  snackbars: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  snackbars: state.snackbar,
});

export default connect(mapStateToProps, { removeSnackbar })(SnackbarAlert);
