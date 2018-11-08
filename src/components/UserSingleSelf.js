import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {FormControl} from "react-bootstrap";

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
                <FormControl
                    type='text'
                    value={this.state.newAddress}
                    placeholder='update address...'
                    onChange={this.changeAddress}
                />
                {(this.state.skills.length > 0) ?
                    <div>
                        <h4>Skills: </h4>
                        {this.state.skills.map(skill => <h5>{skill}</h5>)}
                    </div> :

                    <h4>No skills added yet</h4>
                }
                <FormControl
                    type='text'
                    value={this.state.newSkill}
                    placeholder='add skill...'
                    onChange={this.changeSkill}
                />
                <button onClick={this.addSkill}>Add Skill</button>
                <button onClick={this.save}>Save</button>
            </div>
        )
    }

}

export default UserSingleSelf;