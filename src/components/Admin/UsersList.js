import React from "react";
import useUsers from "../../../hooks/useUsers";
import {
  Table,
  Grid,
  Card,
  CardHeader,
  CardContent,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Chip,
} from "@material-ui/core";


const UsersList = () => {
  const { users } = useUsers("name");
  return (
    <Grid item xs={12} sm={12} md={12} style={{ marginBottom: "1rem"}}>
      <Card>
        <CardHeader color="primary">
          <h4>Users Stats</h4>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Roles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">
                    {user.roles.admin ? (
                      <Chip color="primary" label="Admin" />
                    ) : null}
                    {user.roles.owner ? (
                      <Chip color="primary" label="Owner" />
                    ) : null}
                    {!user.roles.admin && !user.roles.owner ? (
                      <Chip color="primary" label="Client" />
                    ) : null}
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UsersList;
