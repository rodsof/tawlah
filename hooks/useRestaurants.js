import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useRestaurants = orderBy => {

    const [restaurants, saveRestaurants] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {

        const getRestaurants = () => {
            firebase.db.collection('restaurants').orderBy(orderBy, 'desc').onSnapshot(handleSnapshot)
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

        saveRestaurants(restaurants);
    }

    return {
        restaurants
    }
}

export default useRestaurants;