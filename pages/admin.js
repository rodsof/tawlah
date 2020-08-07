import React, { useContext } from 'react'
import Layout from '../src/components/Layout/Layout'
import { FirebaseContext } from '../firebase'
import Lost from '../src/components/Layout/Lost';
import UsersList from '../src/components/Admin/UsersList';
import RestaurantList from '../src/components/Admin/RestaurantList';
import { Grid } from '@material-ui/core';

const Admin = () => {
    const { user, userDB } = useContext(FirebaseContext);
    if (!user || ( Object.keys(userDB).length !== 0 && !userDB.roles.admin)){
        return(
            <Layout>
            <Lost />
            </Layout>
        )
    }
    return (
    <Layout>
        <div>
        <Grid container style={{
            display: "flex",
            flexDirection: "column"
        }}>
        <UsersList />
        <RestaurantList />
        </Grid>
        </div>
    </Layout>
    )
}

export default Admin;