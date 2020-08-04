import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import { useRouter } from 'next/router';
import Map from '../../src/components/Map';

const Restaurant = () => {
     // component state
     const [restaurant, saveRestaurant] = useState({});
     const [error, saveError] =useState(null);
     const [consultDB, saveConsultDB ] = useState(true);

    // Routing to get current id
    const router = useRouter();
    const { query: { id }} = router;
 // context firebase
 const { firebase, user } = useContext(FirebaseContext);

 useEffect(() => {
     if(id && consultDB) {
         const getRestaurant = async () => {
             const restaurantQuery = await firebase.db.collection('restaurants').doc(id);
             const restaurant = await restaurantQuery.get();
             if(restaurant.exists) {
                saveRestaurant( restaurant.data() );
                saveConsultDB(false);
             } else {
                 saveError( true );
                 saveConsultDB(false);
             }
         }
         getRestaurant();
     }
 }, [id]);
 const { street_address, city, zip_code, state } = restaurant;
 

 if(Object.keys(restaurant).length === 0 && !error)  return 'Cargando...';

    return (
        <Map 
        city={city}
        state={state}
        street_address={street_address}
        />
    )
}

export default Restaurant;