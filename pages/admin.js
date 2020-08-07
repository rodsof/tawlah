import React, { useContext } from 'react'
import Layout from '../src/components/Layout/Layout'
import { FirebaseContext } from '../firebase'
import Lost from '../src/components/Layout/Lost';
import UsersList from '../src/components/Admin/UsersList';

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
        <UsersList />
        
    </Layout>
    )
}

export default Admin;