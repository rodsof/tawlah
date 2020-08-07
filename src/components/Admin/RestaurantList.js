import React from 'react';
import useRestaurants from '../../../hooks/useRestaurants';
import {
    Table,
    Grid,
    Card,
    CardHeader,
    CardContent,
    makeStyles,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Chip,
  } from "@material-ui/core";

const RestaurantList = () => {

    const { restaurants } = useRestaurants('name');
    return (
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>Restaurants</h4>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">Owner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell component="th" scope="row">
                        {restaurant.name}
                      </TableCell>
                      <TableCell align="right"> {restaurant.city}</TableCell>
                     <TableCell align="right"> {restaurant.owner.displayName} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      );
}

export default RestaurantList;