import React, {Component} from 'react';

class UserSingleOther extends Component{

    render(){
        const user = this.props.user;
        return (
            <div>
                <h3>{user.fullName}</h3>
                <h4>username: {user.username}</h4>
                <h4>email: {user.email}</h4>
                <h4>Phone: {user.phone}</h4>
                {user.hasOwnProperty('address') ?
                    <h4>Address: {user.address}</h4> :

                    <h4>No address added yet</h4>
                }
                {(user.hasOwnProperty('skills') && Array.isArray(user.skills) && user.skills.length > 0) ?
                    <div>
                        <h4>Skills: </h4>
                        {user.skills.map(skill => <h5>{skill}</h5>)}
                    </div> :

                    <h4>No skills added yet</h4>
                }
            </div>
        )
    }

}

export default UserSingleOther;