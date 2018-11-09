import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {Link} from "react-router-dom";
import {Container, Card, Input} from "semantic-ui-react";

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
                <Input
                    style={{width: '50%'}}
                    icon='search'
                    placeholder='search by name, username, email...'
                    onChange={this.filterList}
                />
                <h2>Users</h2>
                <Container style={{padding: 10}}>
                    <Card.Group>
                        {this.state.filtered.map(user => (
                            <Card key={user.username}>
                                <Card.Content textAlign='left'>
                                    <Card.Header><Link to={'/users/' + user.username}>{user.fullName}</Link></Card.Header>
                                    <Card.Meta>{user.username}</Card.Meta>
                                    <Card.Description>{user.email}</Card.Description>

                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Container>
            </div>
        )
    }

}

export default UserList;