import React, {Component} from 'react';
import {API, Auth} from 'aws-amplify';
import {Button} from "react-bootstrap";
import {Divider, Input, List} from "semantic-ui-react";

class UserSingleSelf extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newAddress: '',
            skills: [],
            newSkill: '',
            newPhone: ''
        }
    }

    componentDidMount(){
        this.setState({
            newPhone: this.props.user.phone
        });
        if(this.props.user.hasOwnProperty('skills'))
            this.setState({
                skills: this.props.user.skills
            });
        if(this.props.user.hasOwnProperty('address'))
            this.setState({
                newAddress: this.props.user.address
            });
    }

    changeAddress = (e) => {
        this.setState({ newAddress: e.target.value});
    }

    changePhone = (e) => {
        if(e.target.value === '')
            this.setState({newPhone: this.props.user.phone});
        else
            this.setState({ newPhone: e.target.value});
    }

    changeSkill = (e) => {
        this.setState({ newSkill: e.target.value});
    }

    addSkill = () => {
        if(this.state.newSkill === ''){
            alert('Please type something in the textbox before adding');
        } else if(this.state.skills.includes(this.state.newSkill)){
            alert('Skill already added!');
        } else {
            this.setState({
                skills: [...this.state.skills, this.state.newSkill]
            });
        }
    }

    validateSkills = () => {
        if(this.props.user.hasOwnProperty('skills')){
            if(this.props.user.skills.length < this.state.skills)
                return true;
            else return false;
        } else {
            if(this.state.skills.length > 0)
                return true;
            else
                return false;
        }
    }

    validateAddress = () => {
        if(this.props.user.hasOwnProperty('address')){
            if(this.state.newAddress !== ''){
                if(this.props.user.address !== this.state.newAddress)
                    return true;
                else
                    return false;
            } else {
                this.setState({
                    newAddress: this.props.user.address
                });
                return false;
            }
        } else {
            if(this.state.newAddress !== '')
                return true;
            else
                return false;
        }
    }

    validatePhoneString = () => {
        if(/^[+]*[0-9]+$/.test(this.state.newPhone)) { //valid number
            return true;
        } else {
            alert('Phone number can only contain digits and a plus at the beginning');
            return false;
        }
    }


    validatePhone = () => {
        if(this.state.newPhone !== this.props.user.phone){
            return true;
        } else {
            return false;
        }
    }


    save = async () => {
        if(this.validatePhoneString()){
            const phone = this.validatePhone();
            const address = this.validateAddress();
            const skills = this.validateSkills();
            if(phone || skills || address){
                const response = API.put('usersCRUD', '/users', {
                    body: {
                        username: this.props.user.username,
                        fullName: this.props.user.fullName,
                        email: this.props.user.email,
                        phone: this.state.newPhone,
                        address: this.state.newAddress,
                        skills: this.state.skills
                    }
                })
                console.log(response);
                alert('Changes persisted!');
            } else {
                alert('You made no changes');
            }
            if(phone){
                const user = await Auth.currentAuthenticatedUser();
                const response = await Auth.updateUserAttributes(user, {
                    phone_number: this.state.newPhone
                });
                console.log(response);
            }
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
                <h2>Phone: <Input size='mini' placeholder={user.phone} onChange={this.changePhone}/></h2>
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