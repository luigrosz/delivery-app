import React, { useEffect } from 'react';
import { Button, Grid, Paper, TextField } from '@mui/material';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [password, setPassword] = React.useState('');

  const handleDisabled = () => {
    const re = /\S+@\S+\.\S+/;
    const minPasswordLength = 6;
    if (re.test(email) && password.length >= minPasswordLength) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  useEffect(() => {
    handleDisabled();
  });

  return (
    <Paper style={ { width: '20%' } }>
      <Grid container xs={ 12 } style={ { justifyContent: 'space-evenly' } }>
        <Grid item xs={ 10 }>
          <TextField
            fullWidth
            margin="normal"
            required
            id="email"
            label="Email"
            value={ email }
            onChange={ handleEmailChange }
            data-testid="common_login__input-email"
          />
        </Grid>
        <Grid item xs={ 10 }>
          <TextField
            fullWidth
            required
            label="Password"
            type="password"
            id="password"
            value={ password }
            onChange={ handlePasswordChange }
            data-testid="common_login__input-password"
          />
        </Grid>
        <Grid item xs={ 10 } paddingBottom={ 1 } paddingTop={ 3 }>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            margin="normal"
            disabled={ disabled }
            data-testid="common_login__button-login"
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={ 10 } paddingBottom={ 2 }>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            margin="normal"
            data-testid="common_login__button-register"
          >
            Ainda não tenho Conta
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
