import React, { useEffect, useState, useContext } from 'react';
import {
  Alert,
  Button,
  Grid,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { context } from '../../context';
import AdminUserTable from './adminUserTable';

const Admin = () => {
  const { APIURL, setUser } = useContext(context);
  const [inputs, setInputs] = useState({ email: '', name: '', password: '', role: '' });
  const [isDisabled, setIsDisabled] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const inputsHandler = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  const registerUser = async () => {
    const { email, password, name, role } = inputs;
    const { token } = JSON.parse(localStorage.getItem('user'));
    console.log(token);
    const response = await fetch(`${APIURL}/register/admin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({
          email, password, name, role,
        }),
      });
    const data = await response.json();
    const notUniqueEmail = 409;
    if (response.status === notUniqueEmail) {
      return setAlreadyExists(true);
    }
    setUser(data);
  };

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlreadyExists(false);
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
    <>
      <Grid container spacing={ 2 } component={ Paper } sx={ { mt: 1.5 } }>
        <Grid item xs={ 12 } sx={ { ml: 1 } }>
          <Typography component="h1" variant="h5" sx={ { mb: 3 } }>
            Cadastrar novo usuário
          </Typography>
        </Grid>
        <Grid item xs={ 2.5 } sx={ { ml: 1 } }>
          <TextField
            label="email"
            variant="outlined"
            name="email"
            fullWidth
            value={ inputs.email }
            onChange={ inputsHandler }
            inputProps={ {
              'data-testid': 'admin_manage__input-email',
            } }
            autoFocus
          />
        </Grid>
        <Grid item xs={ 2.5 } sx={ { ml: 0.5 } }>
          <TextField
            label="Nome"
            name="name"
            fullWidth
            value={ inputs.name }
            variant="outlined"
            onChange={ inputsHandler }
            inputProps={ {
              'data-testid': 'admin_manage__input-name',
            } }
          />
        </Grid>
        <Grid item xs={ 2.5 } sx={ { ml: 0.5 } }>
          <TextField
            label="senha"
            type="password"
            variant="outlined"
            name="password"
            fullWidth
            value={ inputs.password }
            onChange={ inputsHandler }
            inputProps={ {
              'data-testid': 'admin_manage__input-password',
            } }
          />
        </Grid>
        <Grid item xs={ 2.5 } sx={ { ml: 0.5 } }>
          <Select
            native
            fullWidth
            label="tipo"
            inputProps={ { 'data-testid': 'admin_manage__select-role' } }
            onChange={ inputsHandler }
            name="role"
            value={ inputs.role }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </Select>
        </Grid>
        <Grid item xs={ 1.8 }>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={ { height: '100%' } }
            disabled={ isDisabled }
            onClick={ registerUser }
            data-testid="admin_manage__button-register"
          >
            Cadastrar
          </Button>
        </Grid>
      </Grid>
      <AdminUserTable />
      <Snackbar
        open={ alreadyExists }
        autoHideDuration={ 60000 }
        onClose={ handleClose }
        anchorOrigin={ { horizontal: 'center', vertical: 'top' } }
      >
        <Alert
          onClose={ handleClose }
          severity="error"
          sx={ { width: '100%' } }
          data-testid="admin_manage__element-invalid-register"
        >
          Já tem um usuario com esse E-mail, seu topeira!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Admin;
