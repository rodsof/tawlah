import React, { useState, useContext } from 'react';
import { Switch, Box } from '@material-ui/core';
import { FirebaseContext } from '../../firebase';



const SwitchRestaurant = ({active,id}) => {
    const [enabled, setEnabled ] = useState(active);
     // context crud firebase
  const { firebase } = useContext(FirebaseContext);

    // update status
    const handleChangeActive= (event) => {
        setEnabled(event.target.checked);
        firebase.db.collection("restaurants").doc(id).update({
            active: event.target.checked
        });
      };

    return (
        <Box>
            <b>Online?</b>
<Switch color="primary" checked={enabled} onChange={handleChangeActive} />
        </Box>
        
    )
}

export default SwitchRestaurant;