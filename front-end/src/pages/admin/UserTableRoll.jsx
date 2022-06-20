import React, { useContext } from 'react';
import {
  Button,
  TableCell,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import { context } from '../../context';

const UserTableRoll = ({ index, name, email, role }) => {
  const { APIURL } = useContext(context);

  const handleDelete = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    console.log(email);
    await fetch(`${APIURL}/user`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ email }),
    });
  };

  return (
    <TableRow>
      <TableCell
        align="center"
        data-testid={ `admin_manage__element-user-table-item-number-${index}` }
      >
        { index + 1 }
      </TableCell>
      <TableCell
        align="center"
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        { name }
      </TableCell>
      <TableCell
        align="center"
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        { email }
      </TableCell>
      <TableCell
        align="center"
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        { role }
      </TableCell>
      <TableCell
        align="center"
      >
        <Button
          type="submit"
          variant="contained"
          sx={ { height: '100%' } }
          onClick={ handleDelete }
          data-testid={ `admin_manage__element-user-table-remove-${index}` }
        >
          excluir
        </Button>
      </TableCell>
    </TableRow>
  );
};

UserTableRoll.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default UserTableRoll;
