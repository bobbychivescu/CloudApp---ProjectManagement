import React, {Component} from 'react';
import {Divider, List} from "semantic-ui-react";

class UserSingleOther extends Component{

    render(){
        const user = this.props.user;
        return (
            <div style={{padding:'15px'}} align="left">
                <h1>User Details</h1>
                <Divider/>
                <h2>Name: {user.fullName}</h2>
                <h2>Username: {user.username}</h2>
                <h2>Email: {user.email}</h2>
                <h2>Phone: {user.phone}</h2>
                <h2>Skills: </h2>
                <Divider/>
                {(user.hasOwnProperty('skills') && Array.isArray(user.skills) && user.skills.length > 0) ?
                    <div>
                        <List bulleted>
                            {user.skills.map(skill => (
                                <List.Item><h3>{skill}</h3></List.Item>
                            ))}
                        </List>
                    </div> :

                    <h3>No skills added yet!</h3>
                }
            </div>
        )
    }

}

export default UserSingleOther;