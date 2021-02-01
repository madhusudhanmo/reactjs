import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SignOut from './SignOut';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#1D8FCE',
    minHeight: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    paddingLeft: theme.spacing(4),
  },
  logo: {
    backgroundColor: "#fff",
    padding: '4px'
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar justify="space-between" className={classes.root}>
          <div className={classes.logo}>
            <Link to="/">
              <img src="logo.png" alt="logo" className={classes.logo} />
            </Link>
          </div>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Timesheet
          </Typography>
          <SignOut />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
