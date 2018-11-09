import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {Button} from "react-bootstrap";
import {Divider, Input, List} from "semantic-ui-react";

class UserSingleSelf extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newAddress: '',
            skills: [],
            changed: false,
            newSkill: ''
        }
    }

    componentDidMount(){
        if(this.props.user.hasOwnProperty('skills'))
            this.setState({
                skills: this.props.user.skills
            })
    }

    changeAddress = (e) => {
        this.setState({ newAddress: e.target.value, changed: true });
    }

    changeSkill = (e) => {
        this.setState({ newSkill: e.target.value});
    }

    addSkill = () => {
        if(this.state.skills.includes(this.state.newSkill)){
            alert('Skill already added!');
        } else {
            this.setState({
                skills: [...this.state.skills, this.state.newSkill],
                changed: true
            });

        }
    }

    save = async () => {
        if(this.state.changed){
            const response = API.put('usersCRUD', '/users', {
                body: {
                    username: this.props.user.username,
                    fullName: this.props.user.fullName,
                    email: this.props.user.email,
                    phone: this.props.user.phone,
                    address: this.state.newAddress,
                    skills: this.state.skills
                }})
            console.log(response);
            alert('Changes persisted!');
        } else {
            alert('You made no changes');
        }
    }
    render(){
        const user = this.props.user;
        const address = user.hasOwnProperty('address') ? user.address : 'No address added yet';
        return (
            <div style={{padding:'15px'}} align="left">
                <h1>User Details</h1>
                <Divider/>
                <h2>Name: {user.fullName}</h2>
                <h2>Username: {user.username}</h2>
                <h2>Email: {user.email}</h2>
                <h2>Phone: {user.phone}</h2>
                <h2>Address: <Input size='mini' placeholder={address} onChange={this.changeAddress}/></h2>
                <h2>Skills: </h2>
                <Divider/>
                {(this.state.skills.length > 0) ?
                    <div>
                        <List bulleted>
                            {this.state.skills.map(skill => (
                                <List.Item><h3>{skill}</h3></List.Item>
                            ))}
                        </List>
                    </div> :

                    <h3>No skills added yet</h3>
                }
                <Input
                    placeholder='add skill...'
                    onChange={this.changeSkill}
                />
                <Button onClick={this.addSkill}>Add Skill</Button>
                <Divider/>
                <Button onClick={this.save}>Save Changes</Button>
            </div>
        )
    }

}

export default UserSingleSelf;