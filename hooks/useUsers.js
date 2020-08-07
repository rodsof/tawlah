import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useUsers = orderBy => {

    const [users, saveUsers] = useState([]);
    const [spinner, setSpinner] = useState(null);
    const [error, setError] = useState('');
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const getUsers = () => {
            try {
                setSpinner(true);
            firebase.db.collection('users').orderBy(orderBy, 'desc').onSnapshot(handleSnapshot)
            } catch (error) {
                setSpinner(null);
                console.log(error)
                setError("Error getting users, try again");
              }
        }
        getUsers();
    }, []);

    function handleSnapshot(snapshot) {
        const users = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });
        setSpinner(null)
        saveUsers(users);
    }

    return {
        users,
        spinner,
        error
    }
}

export default useUsers;