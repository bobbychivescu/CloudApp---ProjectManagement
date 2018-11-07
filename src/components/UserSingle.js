import React, {Component} from 'react';
import {API} from 'aws-amplify';

import ProjectListAndSearch from './projectListAndSearch'

class UserSingle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    async componentDidMount() {
        const response = await API.get('usersCRUD', '/users/' + this.props.match.params.id);
        if (response !== {})
            this.setState({user: response});

    }

    render(){
        const user = JSON.stringify(this.state.user);
        return (
            <div>
                {user === '{}' ?

                    <h3>The user you are looking for doesn't exist!</h3> :

                    <h3>{user}</h3>
                }
            </div>
        )
    }

}

export default UserSingle;