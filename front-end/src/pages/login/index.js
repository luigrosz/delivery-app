import React, { useEffect } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();
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
    <Grid
      container
      component="main"
      sx={ {
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
      } }
    >
      <Grid
        item
        xs={ 10 }
        sm={ 7 }
        md={ 5 }
        lg={ 5 }
        xl={ 4 }
        component={ Paper }
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <Typography component="h1" variant="h5" sx={ { mb: 3, mt: 2 } }>
          Login
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          required
          id="email"
          label="Email"
          value={ email }
          onChange={ handleEmailChange }
          sx={ { width: '60%', mb: 1 } }
          inputProps={ {
            'data-testid': 'common_login__input-email',
          } }
        />
        <TextField
          fullWidth
          required
          label="Password"
          type="password"
          id="password"
          value={ password }
          onChange={ handlePasswordChange }
          sx={ { width: '60%', mb: 1 } }
          inputProps={ {
            'data-testid': 'common_login__input-password',
          } }
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={ disabled }
          sx={ { mt: 8, mb: 2, width: '60%' } }
          data-testid="common_login__button-login"
        >
          Login
        </Button>
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          onClick={ () => navigate('/register') }
          sx={ { mt: 8, mb: 2, width: '60%' } }
          data-testid="common_login__button-register"
        >
          Ainda não tenho Conta
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
