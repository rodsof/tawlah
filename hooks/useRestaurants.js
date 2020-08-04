import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useRestaurants = orderBy => {

    const [restaurants, saveRestaurants] = useState([]);
    const [spinner, setSpinner] = useState(null);
    const [error, setError] = useState('');
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const getRestaurants = () => {
            
            try {
                setSpinner(true);
            firebase.db.collection('restaurants').orderBy(orderBy, 'desc').onSnapshot(handleSnapshot)
            } catch (error) {
                setSpinner(null);
                console.log(error)
                setError("Error getting restaurants, try again");
              }
        }
        getRestaurants();
    }, []);

    function handleSnapshot(snapshot) {
        const restaurants = snapshot.docs.map(doc => {
            return {
            id: doc.id,
            ...doc.data()
            }
        });
        setSpinner(null)
        saveRestaurants(restaurants);
    }

    return {
        restaurants,
        spinner,
        error
    }
}

export default useRestaurants;