import {
    Typography,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
  } from "@mui/material";
  import { Edit, Delete } from "@mui/icons-material";
  import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import AccountForm from "./AccountForm";

export interface Users {
  id: number;
  username: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
}
  
  export default function AccountCrud() {
    const [users, setUsers] = useState<Users []>([]);
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState<Users | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);


    function handleSelectedUser(user: Users) {
      setSelectedUser(user);
      setEditMode(true);
    }

    useEffect(() => {
          agent.Admin.getUsers()
          .then(users => setUsers(users))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
    }, []); 

    function cancelEdit() {
      if (selectedUser) setSelectedUser(undefined);
      setEditMode(false);
    }

    if (editMode)
    return <AccountForm user={selectedUser} cancelEdit={cancelEdit} />;
  
    
    if (Loading) {
      return <LoadingComponent message="Loading Users" /> 
    }

    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ p: 2 }} variant="h4">
            Inventory
          </Typography>
          <Button
            sx={{ m: 2 }}
            size="large"
            variant="contained"
            onClick={() => setEditMode(true)}
          >
            Create
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="center">NormalizedUsername</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">NormalizedEmail</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Box display="flex" alignItems="center">
                      <span>{user.id}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                   {user.username}
                  </TableCell>
                  <TableCell align="center">{user.normalizedUserName}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.normalizedEmail}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleSelectedUser(user)}
                      startIcon={<Edit />}
                    />
                    <LoadingButton 
                    startIcon={<Delete />} color="error" 
                    
                    />
                  </TableCell>
                </TableRow>
               ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  