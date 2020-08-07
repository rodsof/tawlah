import React from 'react'
import useUsers from '../../../hooks/useUsers';

const UsersList = () => {
    const { users } = useUsers("name");
    return(
        <div>
        {users.map( (user) => {
            return(
            <p> { user.name } </p>
            )
        }
        )}
        </div>
    )

}

export default UsersList;