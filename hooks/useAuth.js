
import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

function useAuth() {
    const [ autenticatedUser, saveAutenticatedUser ] = useState(null);
    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if( user ) {
                saveAutenticatedUser(user);
            } else {
                saveAutenticatedUser(null);
            }
        });
        return () => unsuscribe();
    }, []);

    return autenticatedUser;
}
export default useAuth;