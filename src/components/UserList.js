import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {FormControl, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";

class UserList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filtered: [],
            filter: ''
        };
    }

    async componentDidMount() {
        const response = await API.get('usersCRUD', '/users');
        if (response !== {})
            this.setState({users: response, filtered: response});
    }

    filterList = (e) => {
        this.setState({
            filter: e.target.value
        });
        this.setState({
            filtered: this.state.users.filter( user => {
                return user.username.includes(e.target.value) ||
                    user.fullName.includes(e.target.value) ||
                    user.email.includes(e.target.value);
            })
        });
    }

    render(){
        return (
            <div>
                <FormControl
                    type='text'
                    value={this.state.filer}
                    placeholder='search by name, username, email...'
                    onChange={this.filterList}
                />

                <ListGroup>
                    {this.state.filtered.map(user => (
                        <ListGroupItem>
                            <h3><Link to={'/users/' + user.username}>{user.fullName}</Link></h3>
                            <h4>Username: {user.username}</h4>
                            <h4>Email: {user.email}</h4>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        )
    }

}

export default UserList;