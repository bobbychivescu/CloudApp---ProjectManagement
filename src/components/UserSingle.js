import React, {Component} from 'react';
import {API} from 'aws-amplify';
import UserSingleSelf from './UserSingleSelf'
import UserSingleOther from './UserSingleOther'

class UserSingle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    async componentDidMount() {
        const response = await API.get('usersCRUD', '/users/' + this.props.match.params.id);
        if (response.hasOwnProperty('username'))
            this.setState({user: response});
    }

    render(){
        return (
            <div>
                {Object.keys(this.state.user).length === 0 ?

                    <h3>The user you are looking for doesn't exist!</h3> :

                    <div>
                    {(this.state.user.username === this.props.user) ?

                        <UserSingleSelf user={this.state.user}/> :

                        <UserSingleOther user={this.state.user}/>
                    }</div>
                }
            </div>
        )
    }

}

export default UserSingle;