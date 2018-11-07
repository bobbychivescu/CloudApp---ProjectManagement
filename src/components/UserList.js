import React, {Component} from 'react';
import {API} from 'aws-amplify';

class UserList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    async componentDidMount() {
        const response = await API.get('usersCRUD', '/users');
        if (response !== {})
            this.setState({users: response});
    }

    render(){
        const users = JSON.stringify(this.state.users);
        return (
            <div>
                <h3>{users}</h3>
            </div>
        )
    }

}

export default UserList;