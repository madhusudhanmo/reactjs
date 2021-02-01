import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import sedinApi from '../apis/sedin';
import { signOut } from '../actions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const SignOut = (props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const onSignOut = () => {
    const authenticateUser = async () => {
      const { data } = await sedinApi.post("/api/v1/sessions/logout", {}, {
        headers: {
          Authorization: props.auth.currentUser.auth_token
        }
      });
      props.signOut();
    };
    authenticateUser();
  }

  return (
    <Grid container justify="flex-end">
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{color: '#fff'}}
        >
          {props.auth.currentUser.name}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" >
                    <MenuItem onClick={onSignOut}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Grid>
  )
}

const mapStateToProps = state => {
  return { ...state }
}

export default connect(mapStateToProps, { signOut })(SignOut);

