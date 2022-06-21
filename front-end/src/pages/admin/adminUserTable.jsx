import React, { useEffect, useContext } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { context } from '../../context';
import UserTableRoll from './UserTableRoll';

const AdminUserTable = () => {
  const { users, fetchUsers } = useContext(context);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <TableContainer
      component={ Paper }
    >
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              Item
            </TableCell>
            <TableCell align="center">
              Nome
            </TableCell>
            <TableCell align="center">
              E-Mail
            </TableCell>
            <TableCell align="center">
              Tipo
            </TableCell>
            <TableCell align="center">
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { users.map((user, index) => (<UserTableRoll
            key={ index }
            { ...user }
            index={ index }
          />)) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AdminUserTable;
