import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import sedinApi from '../apis/sedin';
import { signIn } from '../actions';
import Errors from './Errors';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1D8FCE",
  },
  forgotPassword: {
    textAlign: 'right',
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1D8FCE',
    }
  }
});

const SignIn = (props) => {
  const classes = useStyles();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailInput && emailInput.current && emailInput.current.value;
    const password = passwordInput && passwordInput.current && passwordInput.current.value;

    const authenticateUser = async () => {
      const { data } = await sedinApi.post("/api/v1/sessions/login", {}, {
        params: {
          email: email,
          password: password
        },
      });
      if(data.error) {
        setError(data.error)
      } else {
        props.signIn(data);
      }
    };
    authenticateUser();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {error ? <Errors errors={[{message: error}]} /> : null}

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            inputRef={emailInput}
            autoComplete="email"
            autoFocus
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={passwordInput}
            autoComplete="current-password"
          />
          <MuiThemeProvider theme={theme}>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          </MuiThemeProvider>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.isSignedIn }
}

export default connect(mapStateToProps, { signIn })(SignIn);
