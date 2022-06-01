import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormHelperText, Grid, Paper, TextField, Typography } from '@mui/material';

function Signin() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [inputs, setInputs] = useState({ email: '', name: '', password: '' });

  const inputsHandler = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const registerUser = () => {
    if (isDisabled) {
      // only for the lint
      // will be removed after
      setAlreadyExists(false);
      return;
    }

    console.log(inputs);
  };

  useEffect(() => {
    const regex = /[\w.-]+@[\w.-]+\.\w{2,4}/g;
    const minPassLength = 6;
    const minNameLength = 12;
    let isntValid = false;
    if (!regex.test(inputs.email)) {
      isntValid = true;
    }
    if (inputs.name.length < minNameLength) {
      isntValid = true;
    }
    if (inputs.password.length < minPassLength) {
      isntValid = true;
    }

    setIsDisabled(isntValid);
  }, [inputs]);

  return (
    <Grid container component="main" sx={ { height: '100vh' } }>
      <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper }>
        <Box
          sx={ {
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <Typography component="h1" variant="h5" sx={ { mb: 3 } }>
            Sign in
          </Typography>
          <TextField
            label="email"
            variant="outlined"
            name="email"
            value={ inputs.email }
            sx={ { width: '60%', mb: 1 } }
            onChange={ inputsHandler }
            inputProps={ {
              'data-testid': 'common_register__input-email',
            } }
            autoFocus
          />
          <TextField
            label="name"
            name="name"
            value={ inputs.name }
            variant="outlined"
            sx={ { width: '60%', mb: 1 } }
            onChange={ inputsHandler }
            inputProps={ {
              'data-testid': 'common_register__input-name',
            } }
          />
          <TextField
            label="password"
            type="password"
            variant="outlined"
            name="password"
            value={ inputs.password }
            helperText="Must have 6 caracteres"
            sx={ { width: '60%' } }
            onChange={ inputsHandler }
            inputProps={ {
              'data-testid': 'common_register__input-password',
            } }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={ isDisabled }
            sx={ { mt: 3, mb: 2, width: '60%' } }
            onClick={ registerUser }
            data-testid="common_register__button-register"
          >
            Sign In
          </Button>
          {(alreadyExists) && (
            <FormHelperText
              error
              inputProps={ {
                'data-testid': 'common_register__element-invalid_register',
              } }
            >
              Email already registered
            </FormHelperText>
          )}
        </Box>
      </Grid>
      <Grid
        item
        xs={ false }
        sm={ 4 }
        md={ 7 }
        sx={ {
          backgroundImage: 'url(https://images.unsplash.com/photo-1569144157581-984dea473e3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } }
      />
    </Grid>
  );
}

export default Signin;
