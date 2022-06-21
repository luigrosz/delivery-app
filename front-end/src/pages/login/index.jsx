import React, { useEffect, useState, useContext } from 'react';
import {
  Alert, Button, Grid, Paper, Snackbar, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { context } from '../../context';

const Login = () => {
  const { APIURL, setUser } = useContext(context);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleDisabled = () => {
    const { email, password } = inputs;
    const re = /\S+@\S+\.\S+/;
    const minPasswordLength = 6;
    if (re.test(email) && password.length >= minPasswordLength) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  };

  const inputsHandler = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role === 'customer') {
      navigate('/customer/products');
    } else if (user?.role === 'seller') {
      navigate('/seller/orders');
    } else if (user?.role === 'admin') {
      navigate('/admin/manage');
    }
  }, []);

  useEffect(() => {
    handleDisabled();
  }, [inputs]);

  const logUser = async () => {
    const { email, password } = inputs;
    const notFound = 404;
    const response = await fetch(`${APIURL}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password,
        }),
      });
    if (response.status === notFound) {
      return setInvalidEmail(true);
    }
    const data = await response.json();
    setUser(data);
    if (data.role === 'customer') {
      navigate('/customer/products');
    } else if (data.role === 'seller') {
      navigate('/seller/orders');
    } else {
      navigate('/admin/manage');
    }
  };

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setInvalidEmail(false);
  };

  return (
    <div className="center-login">
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
          component={ Paper }
          xs={ 12 }
          sm={ 6 }
          md={ 4 }
          xl={ 3 }
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <Typography component="h1" variant="h5" sx={ { mb: 3, mt: 2 } }>
            Entrar
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            error={ invalidEmail }
            value={ inputs.email }
            onChange={ inputsHandler }
            sx={ { width: '80%', mb: 1 } }
            inputProps={ {
              'data-testid': 'common_login__input-email',
            } }
          />
          <TextField
            fullWidth
            required
            label="Senha"
            type="password"
            id="password"
            name="password"
            value={ inputs.password }
            onChange={ inputsHandler }
            sx={ { width: '80%', mb: 1 } }
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
            onClick={ logUser }
            data-testid="common_login__button-login"
          >
            Entrar
          </Button>
          <Typography component="h2" variant="h6" sx={ { mb: 1, mt: 4 } }>
            Não possui conta?
          </Typography>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            onClick={ () => navigate('/register') }
            sx={ { mt: 0, mb: 2, width: '60%' } }
            data-testid="common_login__button-register"
          >
            Registre-se
          </Button>
          <Snackbar
            open={ invalidEmail }
            autoHideDuration={ 6000 }
            onClose={ handleClose }
            anchorOrigin={ { horizontal: 'center', vertical: 'top' } }
          >
            <Alert
              onClose={ handleClose }
              severity="error"
              sx={ { width: '100%' } }
              data-testid="common_login__element-invalid-email"
            >
              Email não está registrado!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
